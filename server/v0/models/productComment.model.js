class ProductCommentDTO {
  constructor({
    comment_id,
    product_id,
    customer_id,
    personnel_id,
    parent_id,
    content,
    status,
    createdAt,
    updatedAt,
  }) {
    this.comment_id = comment_id;
    this.product_id = product_id;
    this.customer_id = customer_id;
    this.personnel_id = personnel_id;
    this.parent_id = parent_id;
    this.content = content;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.comment_id,
      productId: this.product_id,
      customerId: this.customer_id,
      personnelId: this.personnel_id,
      parentId: this.parent_id,
      content: this.content,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = ProductCommentDTO;
