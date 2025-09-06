class RolePermissionActionDTO {
  constructor({
    id,
    role_id,
    permission_id,
    action_id,
    description,
    status,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.role_id = role_id;
    this.permission_id = permission_id;
    this.action_id = action_id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      roleId: this.role_id,
      permissionId: this.permission_id,
      action: this.action_id,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = RolePermissionActionDTO;
