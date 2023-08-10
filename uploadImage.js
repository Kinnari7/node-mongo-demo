// filename: uploadImage.js

"use strict";

const AWS = require("aws-sdk");
const { v4 : uuidv4 }  = require("uuid");
const s3 = new AWS.S3();
const width = 200;
const height = 200;
const imageType = "image/png";
const bucket = process.env.Bucket;

module.exports.uploadImage = (event, context, callback) => {
    let requestBody = JSON.parse(event.body);
    let imageUrl = requestBody.imageUrl;

    let objectId = uuidv4();
    let objectKey = `resize-${width}x${height}-${objectId}.png`;

    uploadToS3(imageUrl, objectKey)
        .then(function(response) {
            console.log(`Image ${objectKey} was uploaed and resized`);
            callback(null, {
                statusCode: 200, 
                body: JSON.stringify(response)
            });
        })
        .catch(error => console.log(error));
};

/**
* @param {*} data
* @param {string} key
*/
function uploadToS3(data, key) {
    return s3
        .putObject({
            Bucket: bucket,
            Key: key,
            Body: data,
            ContentType: imageType
        })
        .promise();
}

