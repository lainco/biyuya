import _ from "lodash";
import { SingleQuantity } from "./SingleQuantity";

export class CompoundQuantity {
  constructor(...quantities) {
    this.quantities = [];
    for (var q of quantities) this._add(q);
    this._normalize();
  }

  toString() {
    return this.quantities.length > 0 ? this.quantities.map((q) => q.toString()).join(" + ") : "ZERO";
  }

  add(quantity) {
    var ret = new CompoundQuantity(...this.quantities);
    if (quantity instanceof SingleQuantity) ret._add(quantity);
    else for (var q of quantity.quantities) ret._add(q);

    ret._normalize();
    return ret;
  }

  negate() {
    return new CompoundQuantity(...this.quantities.map((x) => x.negate()));
  }

  substract(quantity) {
    return this.add(quantity.negate());
  }

  multiply(number) {
    return new CompoundQuantity(...this.quantities.map((x) => x.multiply(number)));
  }

  _add(singleQuantity) {
    var match = this.quantities.find((q) => _.isEqual(q.unit, singleQuantity.unit));
    if (match) {
      _.remove(this.quantities, (x) => x === match);
      this.quantities.push(match.add(singleQuantity));
    } else this.quantities.push(singleQuantity);
  }

  _normalize() {
    this.quantities = this.quantities.filter((q) => q.quantity != 0);
    this.quantities.sort((a, b) => a.unit.toString().localeCompare(b.unit.toString()));
  }
}
