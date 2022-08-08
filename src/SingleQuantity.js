import _ from "lodash";
import { formatNumber } from "./misc";
import { CompoundQuantity } from "./CompoundQuantity";

export class SingleQuantity {
  constructor(unit, quantity) {
    this.unit = unit;
    this.quantity = Math.round(quantity * 100) / 100;
  }

  toString() {
    return this.unit + " " + formatNumber(this.quantity, 2);
  }

  add(quantity) {
    if (quantity instanceof SingleQuantity) {
      if (_.isEqual(this.unit, quantity.unit)) return new SingleQuantity(this.unit, this.quantity + quantity.quantity);
      else return new CompoundQuantity(this, quantity);
    } else return quantity.add(this);
  }

  negate() {
    return new SingleQuantity(this.unit, -this.quantity);
  }

  substract(quantity) {
    return this.add(quantity.negate());
  }

  multiply(number) {
    return new SingleQuantity(this.unit, this.quantity * number);
  }
}
