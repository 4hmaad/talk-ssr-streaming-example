import { storefrontClient } from "../../lib";
import { Fragment } from "react";
import { getTitle, getPrice, getBrand, getFormattedPrice, getDescription, getSku } from "./helpers";

export default function ProductInfo({ product }) {
  return (
    <div className="flex flex-col px-4 mt-10 lg:col-start-8 lg:col-span-5 w-100 sm:mt-16 sm:px-0 lg:mt-0">
      <span className="text-xl font-normal text-dark">
        {getBrand(product)}
      </span>
      <h1 className="text-6xl font-light text-dark">
        {getTitle(product)}
      </h1>

      <div className="mt-4">
        <h2 className="sr-only">Product Price</h2>
        {getPrice(product.price).sale ? (
          <Fragment>
            <span className="pr-2 text-sm line-through text-dark">
              {
                getFormattedPrice(product.price, {
                  locale: "en-US"
                }).base
              }
            </span>
            <span className="text-xl text-dark">
              {
                getFormattedPrice(product.price, {
                  locale: "en-US"
                }).sale
              }
            </span>
          </Fragment>
        ) : (
          <span className="text-2xl text-dark">
            {
              getFormattedPrice(product.price, {
                locale: "en-US"
              }).base
            }
          </span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="sr-only">Description</h3>

        <div className="space-y-6 text-base text-dark" />
        {getDescription(product)}
      </div>

      <div className="flex flex-row mt-4">
        <h2 className="sr-only">Product SKU</h2>
        <span className="pr-6 text-sm font-extrabold">SKU</span>
        <span className="text-sm">{getSku(product)}</span>
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
