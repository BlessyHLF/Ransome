var fs = require("fs");
var path = require("path");
var encryptor = require("file-encryptor");

var key = "follosco";
var folderPath = "./Drawing";

fs.readdir(folderPath, function (err, files) {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  files.forEach(function (file) {
    var filePath = path.join(folderPath, file);
    var encryptedFilePath = filePath + ".encrypted";

    encryptor.encryptFile(filePath, encryptedFilePath, key, function (err) {
      if (err) {
        console.error("Encryption error for file:", filePath, err);
      } else {
        console.log("Encryption complete for file:", filePath);

        fs.unlink(filePath, function (err) {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("Original file deleted:", filePath);
          }
        });
      }
    });
  });
});
