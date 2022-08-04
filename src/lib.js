import { fabricStorefront } from "@fabric2/storefront-core";

export const config = {
  accountId: '60b910a9b9d1b20008fae769',
  stage: 'sandbox',
  xmApiBaseUrl: 'https://stage.delivery.xm.fabric.zone',
  storeApiGraphQLEndpoint: 'https://store-api.dev.storefront.fabric.inc/graphql/query',
  apiAuthToken: undefined,
  baseUrl: "",
  environment: "sandbox",
  locale: "en-US",
  cartCookie: "fabric_cart",
  accessTokenCookie: ""
};

export const storefrontClient = fabricStorefront.init(config);


export function createResource(promise) {
  let status = 'pending'
  let result = promise.then(
    resolved => {
      status = 'success'
      result = resolved
    },
    rejected => {
      status = 'error'
      result = rejected
    },
  )
  return {
    read() {
      if (status === 'pending') throw result
      if (status === 'error') throw result
      if (status === 'success') return result
      throw new Error('wait! impossible just happened')
    },
  }
}