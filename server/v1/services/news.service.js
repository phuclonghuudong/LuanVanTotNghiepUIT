const NewsDAO = require("../repositories/news.repository");
const PersonnelBUS = require("../services/personnel.service");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../utils/errors");

class NewsBUS {
  async getAllNews() {
    const result = await NewsDAO.findAllNews();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAllNewsActive() {
    const result = await NewsDAO.findActiveNews();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getNewsById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await NewsDAO.findNewsById(id);
    if (!result || result.length == 0)
      throw new NotFoundError("DỮ LIỆU KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getNewsBySlug(slug) {
    if (!slug) {
      throw new BadRequestError("ĐỊNH DANH KHÔNG HỢP LỆ");
    }

    const result = await NewsDAO.findNewsBySlug(slug);
    if (!result) throw new NotFoundError("ĐỊNH DANH KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { newsSlug, newsTitle } = data;
    const [existingBySlug, existingByTitle] = await Promise.all([
      NewsDAO.findNewsBySlug(newsSlug),
      NewsDAO.findNewsByTitle(newsTitle),
    ]);

    if (existingBySlug) throw new ConflictError("ĐỊNH DANH ĐÃ TỒN TẠI");
    if (existingByTitle) throw new ConflictError("TIN TỨC ĐÃ TỒN TẠI");
  }

  async validateForUpdate(excludeId, data) {
    const { newsSlug, newsTitle } = data;
    const [existingBySlug, existingByTitle] = await Promise.all([
      NewsDAO.findNewsBySlug(newsSlug),
      NewsDAO.findNewsByTitle(newsTitle),
    ]);
    if (existingBySlug && Number(existingBySlug.news_id) !== Number(excludeId))
      throw new ConflictError("ĐỊNH DANH ĐÃ TỒN TẠI");
    if (
      existingByTitle &&
      Number(existingByTitle.news_id) !== Number(excludeId)
    )
      throw new ConflictError("TIN TỨC ĐÃ TỒN TẠI");
  }

  async createNews(data) {
    const personnelId = data.personnelId;
    await PersonnelBUS.getPersonnelById(personnelId);

    await this.validateForCreate(data);

    const result = await NewsDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateNews(id, data) {
    const oldData = await this.getNewsById(id);

    await this.validateForUpdate(id, data);

    const isUnchanged =
      oldData.newsTitle === data.newsTitle &&
      oldData.newsSlug === data.newsSlug &&
      oldData.summary === (data.summary || null) &&
      oldData.content === (data.content || null) &&
      oldData.imageUrl === data.imageUrl &&
      new Date(oldData.publishDate) === new Date(data.publishDate) &&
      Boolean(oldData.isFeatured) === Boolean(data.isFeatured) &&
      Number(oldData.viewCount) === Number(data.viewCount) &&
      Number(oldData.status) === Number(data.status);
    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await NewsDAO.update(id, data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateNewsViews(id) {
    await this.getNewsById(id);

    const result = await NewsDAO.updateViews(id);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeleteNews(id) {
    const checkId = await this.getNewsById(id);

    if (Number(checkId.status) === -1)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, DỮ LIỆU ĐÃ BỊ XÓA");

    const result = await NewsDAO.softDeleteNews(id);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new NewsBUS();
