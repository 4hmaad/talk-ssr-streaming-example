import { useResources } from "../../data";

let search
export default function ProductList() {
  const resources = useResources()
  if (resources) {
    search = resources.search.read()
  }

  const products = search?.products.edges.map(({ node }) => node);

  return (
    <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Related products
        </h2>
      </div>

      <div className="grid grid-cols-2 mt-6 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {products.map((product) => (
          <div key={product.itemID} className="relative group">
            <div className="w-full h-56 overflow-hidden bg-gray-200 rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
              <img
                src={product.primaryImage.imageURL}
                alt={product.primaryImage.altLabel}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <p className="mt-1 mb-1 text-sm text-gray-500">
              {product.categories[0].name}
            </p>
            <h3 className="mt-4 text-sm text-dark-700">
              <a href={`/product?=${product.sku}`}>
                <span className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
