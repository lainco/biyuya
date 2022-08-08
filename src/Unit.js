export class Unit {
  constructor(exponents) {
    if (typeof exponents == "string") {
      this.exponents = {};
      this.exponents[exponents] = 1;
    } else this.exponents = exponents;
  }

  toString() {
    var positives = Object.keys(this.exponents)
      .filter((u) => this.exponents[u] > 0)
      .map((u) => (this.exponents[u] == 1 ? u : u + "^" + this.exponents[u]));
    var negatives = Object.keys(this.exponents)
      .filter((u) => this.exponents[u] < 0)
      .map((u) => (this.exponents[u] == -1 ? u : u + "^" + -this.exponents[u]));

    var numerator = positives.length > 0 ? positives.join(".") : "1";

    var denominator =
      negatives.length > 0 ? (negatives.length > 1 ? "(" + negatives.join(".") + ")" : negatives[0]) : null;

    if (denominator != null) return numerator + "/" + denominator;
    else return numerator;
  }

  multiply(unit) {
    var newExponents = Object.assign({}, this.exponents);
    Object.keys(unit.exponents).forEach((u) => {
      var e = unit.exponents[u];
      var c = newExponents[u];
      if (typeof c === "undefined") c = 0;

      if (e + c == 0) delete newExponents[u];
      else newExponents[u] = e + c;
    });
    return new Unit(newExponents);
  }

  divide(unit) {
    var newExponents = Object.assign({}, this.exponents);
    Object.keys(unit.exponents).forEach((u) => {
      var e = unit.exponents[u];
      var c = newExponents[u];
      if (typeof c === "undefined") c = 0;

      if (c - e == 0) delete newExponents[u];
      else newExponents[u] = c - e;
    });
    return new Unit(newExponents);
  }
}
