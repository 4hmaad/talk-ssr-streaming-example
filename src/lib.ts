import { fabricStorefront, StorefrontConfig } from "@fabric2/storefront-core";

const config: StorefrontConfig = {
  accountId: process.env.NEXT_PUBLIC_FABRIC_ACCOUNT_ID as string,
  stage: process.env.NEXT_PUBLIC_FABRIC_STAGE as string,
  xmApiBaseUrl: process.env.NEXT_PUBLIC_FABRIC_SERVICE_XM_BASE_URL,
  storeApiGraphQLEndpoint: process.env
    .NEXT_PUBLIC_FABRIC_STORE_GRAPHQL_ENDPOINT as string,
  apiAuthToken: process.env.NEXT_PUBLIC_FABRIC_API_AUTH_TOKEN,
  baseUrl: "",
  environment: "sandbox",
  locale: "en-US",
  cartCookie: "fabric_cart",
  accessTokenCookie: ""
};

export const storefrontClient = fabricStorefront.init(config);
