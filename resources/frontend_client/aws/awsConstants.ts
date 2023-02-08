class AWSConstants {
  private MODE: string = "DEVELOPMENT";

  constructor() {
    const oThis = this;
    let mode: string = process.argv[process.argv.length - 1];
    if (mode === "PRODUCTION") {
      oThis.MODE = mode;
    } else {
      console.info(
        "For production s3-upload please use",
        "[--mode PRODUCTION] in the script",
      );
    }
  }

  getBucketName() {
    return "dapplooker";
  }

  getBuildBackupPath() {
    const oThis = this;
    if (oThis.MODE === "PRODUCTION") {
      return "analyzer/analyzer_backup/";
    } else {
      return "analyzer_dev/analyzer_backup/";
    }
  }

  getBuildOriginalPath() {
    const oThis = this;
    if (oThis.MODE === "PRODUCTION") {
      return "analyzer/dist/";
    } else {
      return "analyzer_dev/dist/";
    }
  }

  getLocalPath() {
    return "../app/dist";
  }

  getRegion() {
    return "us-east-1";
  }
}

export default new AWSConstants();
