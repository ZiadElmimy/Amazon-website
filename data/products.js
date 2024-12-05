class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsImageUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `${(this.priceCents / 100).toFixed(2)}`;
  }

  extraInfo() {
    return ``;
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfo() {
    return `
      <a href="../images/clothing-size-chart.png" target="_blank">Size chart</a>
    `;
  }
}

class Appliances extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfo() {
    return `
    <a href="../images/appliance-instructions.png" target="_blank">Instructions</a><br>
    <a href="../images/appliance-warranty.png" target="_blank">Warranty</a>
    `;
  }
}

export let products = [];

export function loadProducts(renderFunction) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if(productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
      if(productDetails.type === 'appliance') {
        return new Appliances(productDetails);
      }
      return new Product(productDetails);
    });

    renderFunction();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}

export function getProduct(item) {
  let existing;
  products.forEach((product) => {
    if(product.id === item.productId) {
      existing = product;
    }
  })
  return existing;
}