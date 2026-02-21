class Product {
  #name;
  #description;
  #price;
  #image;

  constructor(name, description, price, image) {
    this.#name = name;
    this.#description = description || null;
    this.#price = price;
    this.#image = image;
  }

  get name() { return this.#name; }
  get description() { return this.#description; }
  get price() { return this.#price; }
  get image() { return this.#image; }

  set name(value) { this.#name = value; }
  set description(value) { this.#description = value; }
  set price(value) { this.#price = value; }
  set image(value) { this.#image = value; }

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
      price: this.#price,
      image: this.#image
    };
  }
}

module.exports = Product;