import { getPrimaryImage, getTitle } from "./helpers";

export default function ProductGallery({ product }) {
  return (
    <div className="mt-10 lg:mt-0 lg:col-span-6">
      <span className="sr-only">{`Image of ${getTitle(product)}`}</span>
      <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
        <img
          src={
            getPrimaryImage(product.attributes, "Primary Image")
              .src
          }
          alt={`of ${getTitle(product)}`}
          className="object-cover object-center w-full h-full"
        />
      </div>
    </div>
  );
}
