const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const NewDTO = require("../models/news.model");

class NewDAO {
  async findAllNews() {
    const result = await prisma.news.findMany();
    return result.map((x) => new NewDTO(x));
  }

  async findActiveNews(status = 1) {
    const result = await prisma.news.findMany({
      where: { status },
    });
    return result.map((c) => new NewDTO(c));
  }

  async findAvailableNews() {
    const result = await prisma.news.findMany({
      where: { status: { not: -1 } },
    });
    return result.map((c) => new NewDTO(c));
  }

  async findNewsByStatus(status = 1) {
    const result = await prisma.news.findMany({
      where: { status },
    });
    return result.map((c) => new NewDTO(c));
  }

  async findNewsById(id) {
    const result = await prisma.news.findUnique({
      where: { news_id: Number(id) },
    });
    return result ? new NewDTO(result) : result;
  }

  async findNewsByTitle(value) {
    const result = await prisma.news.findUnique({
      where: { news_title: value },
    });
    return result ? new NewDTO(result) : result;
  }

  async findNewsBySlug(value) {
    const result = await prisma.news.findUnique({
      where: { news_slug: value },
    });
    return result ? new NewDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.news.create({
      data: {
        personnel_id: Number(data.personnelId),
        news_title: data.newsTitle,
        news_slug: data.newsSlug,
        summary: data.summary,
        content: data.content,
        image_url: data.imageUrl,
        publish_date: new Date(data.publishDate),
        view_count: Number(data.viewCount) ?? 0,
        is_featured: data.isFeatured ?? 1,
        status: Number(data.status) ?? 1,
      },
    });
    return new NewDTO(result);
  }

  async update(id, data) {
    const result = await prisma.news.update({
      where: { news_id: Number(id) },
      data: {
        // personnel_id: Number(data.personnelId),
        news_title: data.newsTitle,
        news_slug: data.newsSlug,
        summary: data.summary,
        content: data.content,
        image_url: data.imageUrl,
        publish_date: new Date(data.publishDate),
        view_count: Number(data.viewCount) ?? 0,
        is_featured: data.isFeatured ?? 1,
        status: Number(data.status) ?? 1,
      },
    });
    return new NewDTO(result);
  }

  async updateViews(id) {
    const result = await prisma.news.update({
      where: { news_id: Number(id) },
      data: {
        view_count: Number(data.viewCount) + 1,
      },
    });
    return new NewDTO(result);
  }

  async softDeleteNews(id) {
    const result = await prisma.news.update({
      where: { news_id: Number(id) },
      data: { status: -1 },
    });
    return new NewDTO(result);
  }

  async hardDeleteNews(id) {
    const result = await prisma.news.delete({
      where: { news_id: Number(id) },
    });
    return new NewDTO(result);
  }
}

module.exports = new NewDAO();
