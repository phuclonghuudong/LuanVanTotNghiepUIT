class CustomerGroupDTO {
  constructor({
    group_id,
    group_name,
    description,
    status,
    createdAt,
    updatedAt,
    customer = [],
  }) {
    this.group_id = group_id;
    this.group_name = group_name;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.customer = customer;
  }

  toJSON() {
    return {
      id: this.group_id,
      name: this.group_name,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
      customer: this.customer,
    };
  }
}

module.exports = CustomerGroupDTO;
