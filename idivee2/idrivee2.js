var AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create an S3 client for IDrive Cloud
const endpoint = new AWS.Endpoint(process.env.ENDPOINT);
const S3 = new AWS.S3({
	endpoint: endpoint
});


module.exports = {
	S3
}