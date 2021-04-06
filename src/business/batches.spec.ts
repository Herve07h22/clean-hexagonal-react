import { Batch, OrderLine } from "./model";

function make_batch_and_line(sku:string, batch_qty:number, line_qty:number):[Batch, OrderLine] {
    return [
        new Batch("batch-001", sku, batch_qty, new Date()),
        new OrderLine({orderid:"order-123", sku, qty:line_qty}),
    ]
}
    

describe("Batch", () => {
  it("allocating to a batch reduces the_available quantity", () => {
    const batch = new Batch("batch-001", "SMALL-TABLE", 20, new Date());
    const line = new OrderLine({orderid:"order-ref", sku:"SMALL-TABLE", qty:2})
    batch.allocate(line);
    expect(batch.available_quantity).toEqual(18);
  });
  it("can allocate if available greater than required", () => {
    const [large_batch, small_line] = make_batch_and_line("ELEGANT-LAMP", 20, 2)
    expect(large_batch.can_allocate(small_line)).toBe(true)
  })
  it("cannot allocate if available smaller than required", () => {
    const [small_batch, large_line] = make_batch_and_line("ELEGANT-LAMP", 2, 20)
    expect(small_batch.can_allocate(large_line)).toBe(false)
  })
  it("can allocate if available equal to required", () => {
    const [batch, line] = make_batch_and_line("ELEGANT-LAMP", 2, 2)
    expect(batch.can_allocate(line)).toBe(true)
  })
  it("cannot allocate if skus do not match", () => {
    const batch = new Batch("batch-001", "UNCOMFORTABLE-CHAIR", 100);
    const different_sku_line = new OrderLine({orderid:"order-123", sku:"EXPENSIVE-TOASTER", qty:10})
    expect(batch.can_allocate(different_sku_line)).toBe(false)
  })
  it("can only deallocate allocated lines", () => {
    const [batch, unallocated_line ] = make_batch_and_line("DECORATIVE-TRINKET", 20, 2)
    batch.deallocate(unallocated_line)
    expect(batch.available_quantity).toBe(20)
  })
  it("allocation is idempotent", () => {
    const [batch, line] = make_batch_and_line("ANGULAR-DESK", 20, 2)
    batch.allocate(line)
    const sameLine = new OrderLine({orderid:"order-123", sku:"ANGULAR-DESK", qty:2})
    batch.allocate(sameLine)
    expect(batch.available_quantity).toBe(18)
  })

});
