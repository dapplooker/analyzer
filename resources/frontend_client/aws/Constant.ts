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
        return oThis.getS3AnalyzerProductionBackupPath();
      } else {
        return oThis.getS3AnalyzerDevelopmentBackupPath();
      }
    }
  
    getBuildOriginalPath() {
      const oThis = this;
      if (oThis.MODE === "PRODUCTION") {
        return oThis.getS3AnalyzerProductionDistPath();
      } else {
        return oThis.getS3AnalyzerDevelopentDistPath();
      }
    }
  
    getLocalPath() {
      return "../app/dist";
    }
  
    getRegion() {
      return "us-east-1";
    }
  
    getS3AnalyzerDevelopentDistPath() {
      return "analyzer_dev/dist/";
    }
  
    getS3AnalyzerDevelopmentBackupPath() {
      return "analyzer_dev/analyzer_backup/";
    }
  
    getS3AnalyzerProductionDistPath() {
      return "analyzer/dist/";
    }
  
    getS3AnalyzerProductionBackupPath() {
      return "analyzer/analyzer_backup/";
    }
  }
  
  export default new AWSConstants();
  