const router = require("express").Router();
const cloudinary = require("cloudinary").v2;

const signedUploadForm = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.API_SECRET
  );

  return { timestamp, signature };
};

router.get("/", (req, res) => {
  const sig = signedUploadForm();
  res.json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname: process.env.CLOUD_NAME,
    apikey: process.env.API_KEY,
  });
});

module.exports = router;
