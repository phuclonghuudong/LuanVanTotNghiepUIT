const { BadRequestError } = require("../utils/errors");
const uploadUtil = require("../utils/uploadImageCloudinary.util");

class UploadBUS {
  async uploadAvatar(file) {
    const result = await uploadUtil.uploadAvatar(file);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG< VUI LÒNG THỬ LẠI");

    return result?.url;
  }
}

module.exports = new UploadBUS();
