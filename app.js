const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = () => {

    const fileContent = fs.readFileSync(path.join(__dirname, 'test.csv'));

    fs.readFile('test.csv', (err, data) => {
        if (err) throw err;
        const params = {
          Bucket: 'jainlogic-csv-data', // pass your bucket name
          Key: 'test.csv', // file will be saved as testBucket/contacts.csv
          Body: fileContent
        };
        s3.upload(params, (s3Err, data) => {
          if (s3Err) throw s3Err
          console.log(`File uploaded successfully at ${data.Location}`)
        });
       });

};

//uploadFile();

const filePath = './downloaded.csv';
const bucketName = 'jainlogic-csv-data';
const key = 'test.csv';

const downloadFile = (filePath, bucketName, key) => {
    const params = {
      Bucket: bucketName,
      Key: key
    };
    s3.getObject(params, (err, data) => {
      if (err) console.error(err);
    
      console.log(Buffer.isEncoding(data.Body));


      fs.writeFileSync(filePath, data.Body);
      console.log(`${filePath} has been created!`);
    });
  };
  
  downloadFile(filePath, bucketName, key);
