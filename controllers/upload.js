const cloudinary = require("cloudinary").v2;

const files = [
  "images/meats/beef.jpg",
  "images/meats/chicken.jpg",
  "images/meats/lamb.jpg",
  "images/meats/pork.jpg",
  "images/meats/turkey.jpg",
  "images/vegetables/broccoli.jpg",
  "images/vegetables/capsicum.jpg",
  "images/vegetables/carrot.jpg",
  "images/vegetables/cucumber.jpg",
  "images/vegetables/spinach.jpg",
  "images/vegetables/tomato.jpg",
];

const upload = async () => {
  const uploads = [];
  files.forEach((file) => {
    const uploadReq = cloudinary.uploader.upload(file, {
      resource_type: "image",
      use_filename: true,
    });
    uploads.push(uploadReq);
  });
  Promise.all(uploads)
    .then(() => console.log("upload complete"))
    .catch((e) => console.log(e));
};

module.exports = upload;
