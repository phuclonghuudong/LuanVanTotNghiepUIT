class AddressDTO {
  constructor({
    address_id,
    customer_id,
    fullname,
    phone,
    address,
    is_main,
    status,
    createdAt,
    updatedAt,
  }) {
    this.address_id = address_id;
    this.customer_id = customer_id;
    this.fullname = fullname;
    this.phone = phone;
    this.address = address;
    this.is_main = is_main;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.address_id,
      customerId: this.customer_id,
      fullname: this.fullname,
      phone: this.phone,
      address: this.address,
      isMain: this.is_main,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = AddressDTO;
