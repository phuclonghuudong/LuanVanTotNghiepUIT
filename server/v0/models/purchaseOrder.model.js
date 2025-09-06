class PurchaseOrderDTO {
  constructor({
    po_id,
    personnel_id,
    supplier_name,
    note,
    total_price,
    status,
    createdAt,
    updatedAt,
  }) {
    this.po_id = po_id;
    this.personnel_id = personnel_id;
    this.supplier_name = supplier_name;
    this.note = note;
    this.total_price = total_price;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.po_id,
      personnelId: this.personnel_id,
      supplierName: this.supplier_name,
      note: this.note,
      totalPrice: this.total_price,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = PurchaseOrderDTO;
