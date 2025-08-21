class NewsDTO {
  constructor({
    news_id,
    personnel_id,
    news_title,
    summary,
    news_slug,
    content,
    image_url,
    view_count,
    publish_date,
    is_featured,
    status,
    createdAt,
    updatedAt,
  }) {
    this.news_id = news_id;
    this.personnel_id = personnel_id;
    this.news_title = news_title;
    this.summary = summary;
    this.news_slug = news_slug;
    this.content = content;
    this.image_url = image_url;
    this.view_count = view_count;
    this.publish_date = publish_date;
    this.is_featured = is_featured;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.news_id,
      personnelId: this.personnel_id,
      newsTitle: this.news_title,
      summary: this.summary,
      newsSlug: this.news_slug,
      content: this.content,
      imageUrl: this.image_url,
      viewCount: this.view_count,
      publishDate: this.publish_date,
      isFeatured: this.is_featured,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = NewsDTO;
