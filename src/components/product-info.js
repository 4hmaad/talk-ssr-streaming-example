import { storefrontClient } from "@/lib/storefront-client";
import { Fragment } from "react";
import { ProductGetters } from "../helpers";

export function ProductInfo({ product, cartId }) {
  const productGetters = new ProductGetters(product);

  return (
    <div className="flex flex-col lg:col-start-8 lg:col-span-5 px-4 mt-10 w-100 sm:mt-16 sm:px-0 lg:mt-0">
      <span className="text-xl font-normal text-dark">
        {productGetters.getBrand()}
      </span>
      <h1 className="text-6xl font-light text-dark">
        {productGetters.getTitle()}
      </h1>

      <div className="mt-4">
        <h2 className="sr-only">Product Price</h2>
        {productGetters.getPrice(product.price).sale ? (
          <Fragment>
            <span className="text-sm line-through text-dark pr-2">
              {
                productGetters.getFormattedPrice(product.price, {
                  locale: "en-US"
                }).base
              }
            </span>
            <span className="text-xl text-dark">
              {
                productGetters.getFormattedPrice(product.price, {
                  locale: "en-US"
                }).sale
              }
            </span>
          </Fragment>
        ) : (
          <span className="text-2xl text-dark">
            {
              productGetters.getFormattedPrice(product.price, {
                locale: "en-US"
              }).base
            }
          </span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="sr-only">Description</h3>

        <div className="space-y-6 text-base text-dark" />
        {productGetters.getDescription()}
      </div>

      <div className="flex flex-row mt-4">
        <h2 className="sr-only">Product SKU</h2>
        <span className="pr-6 text-sm font-extrabold">SKU</span>
        <span className="text-sm">{productGetters.getSku()}</span>
      </div>
      <div className="flex mt-20">
        <button
          onClick={() =>
            storefrontClient.cart.addLineItems({
              cartID: cartId,
              items: [{ itemID: 10, quantity: 1 }]
            })
          }
          className="flex items-center justify-center flex-1 h-16 max-w-xs px-8 py-3 text-base font-bold text-white bg-dark border border-transparent rounded-[250px] hover:bg-dark focus:outline-none focus:ring-2 focus:bg-dark focus:ring-offset-4 ring-black sm:w-full"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
