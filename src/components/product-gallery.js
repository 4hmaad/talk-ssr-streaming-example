import { ProductGetters } from "../helpers";

export default function ProductGallery({ product }) {
  const productGetters = new ProductGetters(product);
  return (
    <div className="mt-10 lg:mt-0 lg:col-span-6">
      <span className="sr-only">{`Image of ${productGetters.getTitle()}`}</span>
      <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
        <img
          src={
            productGetters.getPrimaryImage(product.attributes, "Primary Image")
              .src
          }
          alt={`of ${productGetters.getTitle()}`}
          className="object-cover object-center w-full h-full"
        />
      </div>
    </div>
  );
}
