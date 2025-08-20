class RoleDTO {
  constructor({
    role_id,
    role_name,
    role_slug,
    description,
    is_system,
    status,
    createdAt,
    updatedAt,
    account = [],
  }) {
    this.role_id = role_id;
    this.role_name = role_name;
    this.role_slug = role_slug;
    this.description = description;
    this.is_system = is_system;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.account = account;
  }

  toJSON() {
    return {
      id: this.role_id,
      name: this.role_name,
      slug: this.role_slug,
      description: this.description,
      isSystem: this.is_system,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      account: this.account,
    };
  }
}

module.exports = RoleDTO;
