import { Unit } from "./Unit";

describe("Units", () => {
  test("A unit could be created", () => {
    var m = new Unit("m");

    expect(m.exponents).toEqual({ m: 1 });
  });
  test("A unit could be raised", () => {
    var m2 = new Unit({ m: 2 });
    expect(m2.exponents).toEqual({ m: 2 });
    expect(m2.toString()).toEqual("m^2");
  });
  test("A unit could have negative exponent", () => {
    var m_1 = new Unit({ m: -1 });
    expect(m_1.exponents).toEqual({ m: -1 });
    expect(m_1.toString()).toEqual("1/m");
  });
  test("A unit could have differents exponents", () => {
    var v = new Unit({ m: 1, s: -1 });
    var a = new Unit({ m: 1, s: -2 });

    expect(v.toString()).toEqual("m/s");
    expect(a.toString()).toEqual("m/s^2");
  });
  test("A unit could by mutliplied by other unit", () => {
    var m = new Unit("m");
    var s = new Unit("s");

    expect(m.multiply(s).toString()).toEqual("m.s");
    expect(m.multiply(s).multiply(s).toString()).toEqual("m.s^2");
  });
  test("A unit could be divided by other unit", () => {
    var m = new Unit("m");
    var s = new Unit("s");
    var v = new Unit({ m: 1, s: -1 });
    var a = new Unit({ m: 1, s: -2 });

    expect(m.divide(s)).toEqual(v);
    expect(m.divide(s).divide(s)).toEqual(a);
  });
  test("A unit dividied by other unit could result 1", () => {
    var m = new Unit("m");
    var s = new Unit("s");
    var v = new Unit({ m: 1, s: -1 });
    var a = new Unit({ m: 1, s: -2 });

    expect(m.divide(m).toString()).toEqual("1");
    expect(s.divide(s).toString()).toEqual("1");
    expect(v.divide(v).toString()).toEqual("1");
    expect(a.divide(a).toString()).toEqual("1");
  });
});
