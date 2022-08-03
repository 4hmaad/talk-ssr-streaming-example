export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export class ProductGetters {
  constructor(productDTO) {
    this.productDTO = productDTO;
  }

  getSku() {
    return this.productDTO.sku;
  }

  getTitle() {
    return this.productDTO.name;
  }

  getDescription() {
    return this.productDTO.description;
  }

  getBrand() {
    return this.productDTO.brand;
  }

  getVariants() {
    return this.productDTO.variants;
  }

  getOptions(optionAttributes) {
    const options = [];
    this.productDTO.variants.forEach((variant) => {
      const variantOptions = variant.attributes.filter((attribute) =>
        optionAttributes.includes(attribute.name)
      );

      variantOptions.forEach((optionAttribute) => {
        const optionIndex = options.findIndex(
          (o) => o.displayName === optionAttribute.name
        );
        if (optionIndex < 0) {
          options.push({
            displayName: optionAttribute.name,
            values: [{ label: optionAttribute.value }]
          });
          return;
        }

        const valueExists = !!(
          options[optionIndex].values.findIndex(
            (v) => v.label === optionAttribute.value
          ) > -1
        );
        if (valueExists) {
          return;
        }

        options[optionIndex].values.push({ label: optionAttribute.value });
      });
    });
    return options;
  }

  getPrimaryImage(attributes, primaryImageAttribute) {
    const imageAttribute = attributes.find(
      (a) => a.name === primaryImageAttribute
    );
    return {
      src: imageAttribute.value
    };
  }

  getPrice(price) {
    return {
      currency: price.currency,
      base: price?.base,
      sale: price?.sale
    };
  }

  getFormattedPrice(price, { locale }) {
    return {
      base: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: price.currency
      }).format(price.base),
      sale: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: price.currency
      }).format(price.sale)
    };
  }

  getInventory(inventory) {
    return {};
  }
}
