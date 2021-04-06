export class OrderLine {
    readonly orderid: string;
    readonly sku: string;
    readonly qty: number;

  constructor(line: { orderid: string, sku: string, qty: number}) {
    this.orderid = line.orderid;
    this.sku = line.sku;
    this.qty = line.qty;
  }


  equals(line: OrderLine) {
    return (
      line.orderid === this.orderid &&
      line.sku === this.sku &&
      line.qty === this.qty
    );
  }
}

export class Batch {
  reference: string;
  sku: string;
  eta?: Date;
  private _purchased_quantity: number;
  private _allocations: OrderLine[];
  get allocated_quantity() {
    return this._allocations.reduce((sum, value) => sum + value.qty, 0);
  }
  get available_quantity() {
    return this._purchased_quantity - this.allocated_quantity;
  }

  constructor(ref: string, sku: string, qty: number, eta?: Date) {
    this.reference = ref;
    this.sku = sku;
    this.eta = eta;
    this._purchased_quantity = qty;
    this._allocations = [];
  }

  allocate(line: OrderLine) {
    if (this.can_allocate(line)) {
      this._allocations.push(line);
    }
  }

  can_allocate(line: OrderLine) {
    return (
      this.sku === line.sku &&
      this.available_quantity >= line.qty &&
      !this._allocations.find((l) => l.equals(line))
    );
  }

  deallocate(line: OrderLine) {
    this._allocations = this._allocations.filter((l) => !l.equals(line));
  }
}
