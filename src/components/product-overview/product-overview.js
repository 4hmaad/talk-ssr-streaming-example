import { useResources } from '../../data'
import ProductInfo from './product-info'
import ProductGallery from './product-gallery'

let product;
export default function ProductOverview() {
  const resources = useResources()
  if (resources) {
    product = resources.product.read()
  }

  return (
    <div className="max-w-4xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <ProductInfo product={product} />
        <ProductGallery product={product} />
      </div>
    </div>
  )
}