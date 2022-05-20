'use strict';

const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports.get = (event, context, callback) => {
  const params = {
    Bucket: 'vinod-web-hosting'
  };

  // fetch todo from the database
  s3.listObjectsV2(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }


    var allKeys = [];
    var contents = result.Contents;
    contents.forEach(function (content) {
        allKeys.push(content.Key);
    });

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(allKeys),
    };
    callback(null, response);
  });
};