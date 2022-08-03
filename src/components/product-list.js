export function ProductList() {
  const data = { data: { products: { edges: [] } } };
  const products = data.products.edges.map(({ node }) => node);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Related products
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {products.map((product) => (
          <div key={product.itemID} className="group relative">
            <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
              <img
                src={product.primaryImage.imageURL}
                alt={product.primaryImage.altLabel}
                className="w-full h-full object-center object-cover"
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
