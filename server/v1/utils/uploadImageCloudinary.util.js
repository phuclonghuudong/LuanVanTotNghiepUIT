const configENV = require("../configs/configENV");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: configENV.CLOUD_NAME,
  api_key: configENV.CLOUD_API_KEY,
  api_secret: configENV.CLOUD_API_SECRET,
});

const uploadAvatar = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "PHPMol" }, (error, uploadResult) => {
        return resolve(uploadResult);
      })
      .end(buffer);
  });

  return uploadImage;
};

module.exports = { uploadAvatar };
