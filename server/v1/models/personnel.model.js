class PersonnelDTO {
  constructor({
    personnel_id,
    fullname,
    gender,
    birthday,
    cccd,
    address,
    avatar,
    status,
    createdAt,
    updatedAt,
    // productComment = [],
    // purchaseOrder = [],
    // news = [],
    // contacts = [],
    // orderConfirmation = [],
  }) {
    this.personnel_id = personnel_id;
    this.fullname = fullname;
    this.gender = gender;
    this.birthday = birthday;
    this.cccd = cccd;
    this.address = address;
    this.avatar = avatar;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    // this.productComment = productComment;
    // this.purchaseOrder = purchaseOrder;
    // this.news = news;
    // this.contacts = contacts;
    // this.orderConfirmation = orderConfirmation;
  }

  toJSON() {
    return {
      id: this.personnel_id,
      fullname: this.fullname,
      gender: this.gender,
      birthday: this.birthday,
      cccd: this.cccd,
      address: this.address,
      avatar: this.avatar,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
      // productComment,
      // purchaseOrder,
      // news,
      // contacts,
      // orderConfirmation,
    };
  }
}

module.exports = PersonnelDTO;
