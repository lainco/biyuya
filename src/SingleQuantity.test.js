import { Unit } from "./Unit";
import { SingleQuantity } from "./SingleQuantity";
import { CompoundQuantity } from "./CompoundQuantity";

const ars = new Unit("ARS");
const eur = new Unit("EUR");
const ars100 = new SingleQuantity(ars, 100);
const ars500 = new SingleQuantity(ars, 500);
const eur100 = new SingleQuantity(eur, 100);
const eur500 = new SingleQuantity(eur, 500);

describe("Single Quantity", () => {
  test("Could Create a Singlue Quantity and Renders", () => {});
  test("", () => {
    expect(ars100).toEqual({ unit: ars, quantity: 100 });
  });
  test("Same currency add return Single Quantity", () => {
    expect(ars100.add(ars100)).toEqual(new SingleQuantity(ars, 200));
  });
  test("Different currencies add return Compound Quantity", () => {
    expect(ars100.add(eur100)).toEqual(new CompoundQuantity(ars100, eur100));
    expect(eur100.add(ars100)).toEqual(new CompoundQuantity(ars100, eur100));
  });
  test("Add behave as expected", () => {
    expect(ars100.toString()).toEqual("ARS 100");
    expect(ars100.add(ars100)).toEqual(new SingleQuantity(ars, 200));
    expect(ars100.add(eur100)).toEqual(new CompoundQuantity(ars100, eur100));
    expect(eur100.add(ars100)).toEqual(new CompoundQuantity(ars100, eur100));
  });
  test("Negate behave as expected", () => {
    expect(ars100.negate()).toEqual(new SingleQuantity(ars, -100));
    expect(new CompoundQuantity(ars100, eur100).negate()).toEqual(
      new CompoundQuantity(ars100.negate(), eur100.negate())
    );
  });
  test("multiply behave as expected", () => {
    expect(ars100.multiply(0.5)).toEqual(new SingleQuantity(ars, 50));
    expect(new CompoundQuantity(ars100, eur100).multiply(2)).toEqual(
      new CompoundQuantity(ars100.multiply(2), eur100.multiply(2))
    );
  });
  test("substract behave as expected", () => {
    expect(ars500.substract(ars100)).toEqual(new SingleQuantity(ars, 400));
    expect(new CompoundQuantity(ars500, eur500).substract(new CompoundQuantity(ars100, eur100))).toEqual(
      new CompoundQuantity(ars100.multiply(4), eur100.multiply(4))
    );
  });
});
