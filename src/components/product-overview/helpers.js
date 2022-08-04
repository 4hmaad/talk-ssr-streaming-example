export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getSku(productDTO) {
  return productDTO.sku;
}

export function getTitle(productDTO) {
  return productDTO.name;
}

export function getDescription(productDTO) {
  return productDTO.description;
}

export function getBrand(productDTO) {
  return productDTO.brand;
}

export function getVariants(productDTO) {
  return this.productDTO.variants;
}

export function getOptions(productDTO, optionAttributes) {
  const options = [];
  productDTO.variants.forEach((variant) => {
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

export function getPrimaryImage(attributes, primaryImageAttribute) {
  const imageAttribute = attributes.find(
    (a) => a.name === primaryImageAttribute
  );
  return {
    src: imageAttribute.value
  };
}

export function getPrice(price) {
  return {
    currency: price.currency,
    base: price?.base,
    sale: price?.sale
  };
}

export function getFormattedPrice(price, { locale }) {
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

export function getInventory(inventory) {
  return {};
}

