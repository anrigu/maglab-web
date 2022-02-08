const uploadFile = require("../middlewares/upload");
const fs = require("fs");
var AWS = require("aws-sdk");
const db = require("../models");
const File = db.file;
const Station = db.station;
require('dotenv').config()
var readline = require('readline');
var stream = require('stream');

const upload = async (req, res) => {
  try {
    console.log("strt")
    
    await uploadFile(req, res);
    if (req.files == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const file = req.files;
    console.log(req.files)
    console.log("check")
    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
  
    //Where you want to store your file
    console.log("start")

    for (let i = 0; i < file.length; i++) { 
      if (file[i].originalname.substring(0, 6) == "header") {


        const multerText = Buffer.from(file[i].buffer).toString("utf-8");
        var array = multerText.split('\n');
        console.log(array[0])

        const header = new File({
          user_id: array[0].split("=")[1],
          user_name: array[1].split("=")[1],
          datetime: array[2].split("=")[1],
          duration: array[3].split("=")[1],
          lat: array[4].split("=")[1],
          long: array[5].split("=")[1],
          pniFilename: array[6].split("=")[1],
          gpsFilename: array[7].split("=")[1],
          file_url: "https://maglab.s3.amazonaws.com/" + req.body.user_id + "/" + file.originalname
        });

        var query = { lat: array[4].split("=")[1], long: array[5].split("=")[1] };
        const update = new Station({
          lat: array[4].split("=")[1],
          long: array[5].split("=")[1],
          users: [{
            user_id: array[0].split("=")[1],
            user_name: array[1].split("=")[1],
            files: [{
              file_url: "https://maglab.s3.amazonaws.com/" + req.body.user_id + "/" + file.originalname
            }]
          }]
        })

        options = { upsert: true, new: true, setDefaultsOnInsert: true };

        console.log("===========");
        let resp = await Station.findOne(query);

        if (!resp) {
          update.save((err, res) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          })

        } else {
          console.log("exists")
          const push_update = ({

              user_id: array[0].split("=")[1],
              user_name: array[1].split("=")[1],
              files: [{
                file_url: "https://maglab.s3.amazonaws.com/" + req.body.user_id + "/" + file.originalname
              }]
        
          })

          Station.findOneAndUpdate(
            query, 
            { $push: { users: push_update } },
            function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  console.log(success);
              }
            }
          )
        };
        

        header.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        })

      } else {

        var params1 = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: req.body.user_id + "/" + file[i].originalname,
          Body: file[i].buffer,
          ContentType: file[i].mimetype,
          ACL: "public-read"
        };
      
        //console.log(params1);
        s3bucket.upload(params1, function(err, data) {
          if (err) {
            console.log(err)
            res.status(500).json({ error: true, Message: err });
          } else {
            res.status(200).send({
              message: "Uploaded the file successfully: " + params1.Key,
            });
          }
        });
        
      }
    }

  } catch (err) {
    console.log("error")
    console.log(err)
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/" + req.body["user_id"];

  const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

  console.log(req.body["user_id"])

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  //Where you want to store your file

  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Delimiter: '',
    Prefix: req.body["user_id"] + '/'
  };

  let fileInfos = [];
      
  s3bucket.listObjectsV2(params, function (err, data) {
    if (err) {
        console.log(err, err.stack); // an error occurred
    } else {
        console.log(data)
        var contents = data.Contents;
        contents.forEach(function (content) {
          fileData = {}
          fileData["name"] = content.Key;
          fileData["date"] = content.LastModified;
          fileData["size"] = content.Size;
          fileData["url"] = s3FileURL + content.Key;
          fileInfos.push(fileData);
        });
    }
    
    console.log(fileInfos)
    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const userID = req.params.user_id;
  const directoryPath = __basedir + "/resources/static/assets/uploads/" + userID + "/" + fileName;
  console.log(directoryPath)

  res.download(directoryPath, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const browseFiles = (req, res) => {

  Station.find(function (err, results) {
    console.log("browseFiles")
    console.log(results)
    res.status(200).send(results);
  });
  
};

module.exports = {
  upload,
  getListFiles,
  download,
  browseFiles
};
