class AWSConstants {
  constructor() {}
  getBucketName() {
    return "dapplooker";
  }

  getBuildBackupPath() {
    return "analyzer/analyzer_backup/";
  }

  getBuildOriginalPath() {
    return "analyzer/dist/";
  }

  getLocalPath() {
    return "../app/dist";
  }

  getRegion() {
    return "us-east-1";
  }
}

export default new AWSConstants();
