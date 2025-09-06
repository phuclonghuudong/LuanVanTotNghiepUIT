class ActionDTO {
  constructor({
    action_id,
    action_name,
    description,
    status,
    createdAt,
    updatedAt,
    rolePermissionAction = [],
  }) {
    this.action_id = action_id;
    this.action_name = action_name;
    this.description = description;
    this.status = status;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  toJSON() {
    return {
      id: this.action_id,
      name: this.action_name,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = ActionDTO;
