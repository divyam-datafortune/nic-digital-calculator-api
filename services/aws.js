const aws = require('aws-sdk');
/**
 *To save pdf files on s3 bucket
 * @param pdf - request data
 * @returns Pdf file  public url
 */
module.exports.uploadPdfBuffer = async (buffer) => {

  const s3 = new aws.S3({
    accessKeyId: process.env.CLOUDCUBE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDCUBE_SECRET_ACCESS_KEY,
    region: process.env.CLOUDCUBE_REGION,
  });
  const fileName = `${process.env.MY_CLOUDCUBE}/public/NICE-InContact-Recommendation-Report-${Date.now()}.pdf`;
  const filePath = `${process.env.CLOUDCUBE_URL}/${fileName}`;

  const uploadParams = { Bucket: 'cloud-cube', Key: fileName, Body: buffer };

  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    }
  });
  return filePath;
};
