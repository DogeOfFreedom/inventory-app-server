const cloudinary = require("cloudinary").v2;

const API_KEY = "653684641526392";
const API_SECRET = "O_do993S04mh0gUiYzA3Nyd5TOM";
cloudinary.config({
  cloud_name: "dhtsrj5lb",
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

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
