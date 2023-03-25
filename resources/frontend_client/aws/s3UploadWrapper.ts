import AWSConstants from "./Constant";

const AWS = require("aws-sdk");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

class S3Helper {
  private s3;
  constructor() {
    AWS.config.update({ region: AWSConstants.getRegion() });
    this.s3 = new AWS.S3();
  }

  _copyFile(s3Params) {
    return this.s3.copyObject(s3Params).promise();
  }

  async _delete_files(deleteParams) {
    if (deleteParams.Delete.Objects.length === 0) {
      return;
    }
    try {
      // console.log(`Deleting files: ${JSON.stringify(deleteParams)}`)
      const deleteObjects = await this.s3.deleteObjects(deleteParams).promise();
      console.log(
        `Deleted objects while move: ${deleteObjects.Deleted.length}`,
      );
      // console.log(`Deleted files: ${JSON.stringify(deleteObjects)}`)
    } catch (ex) {
      console.log(
        `Failed delete file with exception : ${ex} for params: ${JSON.stringify(
          deleteParams,
        )}`,
      );
    }
  }

  async emptyS3Directory(bucketName, objKeyPrefix) {
    console.log(`Starting cleaning up backup folder ${objKeyPrefix}`);
    const listParams = {
      Bucket: bucketName,
      Prefix: objKeyPrefix,
    };
    const listedObjects = await this.s3.listObjectsV2(listParams).promise();
    if (listedObjects.Contents.length === 0) {
      console.log(`Nothing to delete before starting backup.`);
      return;
    }
    const deleteParams = {
      Bucket: bucketName,
      Delete: { Objects: [] as any },
    };
    let totalObjDelete = 0;
    listedObjects.Contents.forEach(({ Key }) => {
      if (objKeyPrefix !== Key) {
        deleteParams.Delete.Objects.push({ Key });
        totalObjDelete += 1;
      }
    });
    if (totalObjDelete > 0) {
      const deleteObjects = await this.s3.deleteObjects(deleteParams).promise();
      console.log(
        `Deleted total ${deleteObjects.Deleted.length} objects from backup folder`,
      );
    }
    if (listedObjects.IsTruncated) {
      await this.emptyS3Directory(bucketName, objKeyPrefix);
    }
  }

  async moveS3FolderData(bucketName, srcKeyPrefix, destKeyPrefix) {
    console.log(`Starting moving file from build folder to backup folder`);
    const oThis = this;
    // tslint:disable-next-line:only-arrow-functions
    const listedObjects = await this.s3
      .listObjectsV2({ Prefix: srcKeyPrefix, Bucket: bucketName })
      .promise();
    if (listedObjects.Contents.length === 0) {
      return new Promise(() => {});
    }
    const deleteParams = {
      Bucket: bucketName,
      Delete: { Objects: [] as any },
    };
    for (const { Key } of listedObjects.Contents) {
      try {
        console.log(`Moving file: ${Key}`);
        if (srcKeyPrefix === Key) {
          continue;
        }
        const s3Params = {
          Bucket: bucketName,
          CopySource: `${bucketName}/${Key}`,
          Key: `${Key.replace(srcKeyPrefix, destKeyPrefix)}`,
        };
        await oThis._copyFile(s3Params).then(() => {
          deleteParams.Delete.Objects.push({ Key });
          console.log(
            `Copied file from ${s3Params.CopySource}, ${s3Params.Key}`,
          );
        });
      } catch (ex) {
        console.log(
          `Failed with the following exception : ${ex} for key: ${Key}`,
        );
      }
    }
    await oThis
      ._delete_files(deleteParams)
      .then(() => console.log("Deleted all files in build folder after moving"))
      .catch(err => console.log(`Failed with error ${err}`));
    console.log(`Backup done for build files`);
  }

  async uploadFileToS3(localPath, s3BucketPath) {
    const putObjects = `aws s3 cp ${localPath} s3://${s3BucketPath} --recursive`;
    console.log("Uploading objects to s3 bucket");
    await exec(putObjects)
      .then(() => {
        console.log("Deploy to s3 bucket has been successfully completed");
      })
      .catch(err => {
        console.log(err);
      });
    return new Promise(() => {});
  }
}

async function deployment() {
  const awsS3Obj = new S3Helper();
  const bucketName = AWSConstants.getBucketName();
  const buildBackupPath = AWSConstants.getBuildBackupPath();
  const buildOriginalPath = AWSConstants.getBuildOriginalPath();

  await awsS3Obj
    .emptyS3Directory(bucketName, buildBackupPath)
    .then(r => console.log("Files deleted from backup folder"));
  await awsS3Obj
    .moveS3FolderData(bucketName, buildOriginalPath, buildBackupPath)
    .then(r => console.log("Moved files from build folder to backup folder"));
}

async function uploadFile() {
  console.log("Starting uploading file");
  const awsS3Obj = new S3Helper();
  const bucketName = AWSConstants.getBucketName();
  const buildOriginalPath = AWSConstants.getBuildOriginalPath();
  const localPath = AWSConstants.getLocalPath();

  await awsS3Obj
    .uploadFileToS3(localPath, `${bucketName}/${buildOriginalPath}`)
    .then(r => console.log("Moved files from local folder to S3 folder"));
}

deployment().then(() => {
  uploadFile().then(r => console.log("File uploaded"));
  console.log("Ready to upload");
});
