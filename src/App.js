/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Html from "./Html";
import Layout from "./Layout";

const ProductOverview = lazy(() => import("./components/product-overview/product-overview" /* webpackPrefetch: true */));
const ProductList = lazy(() => import("./components/product-list/product-list" /* webpackPrefetch: true */));

export default function App() {
  return (
    <Html title="Streaming SSR">
      <Suspense fallback={"Loading"}>
        <ErrorBoundary FallbackComponent={Error}>
          <Content />
        </ErrorBoundary>
      </Suspense>
    </Html>
  );
}

function Content() {
  return (
    <Layout>
      <h1 style={{ padding: '2rem 0rem', textAlign: 'center' }}>
        Streaming SSR
      </h1>
      <Suspense fallback="Loading product...">
        <ProductOverview />
      </Suspense>
      <Suspense fallback="Loading products...">
        <ProductList />
      </Suspense>
    </Layout>
  );
}

function Error({ error }) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error.stack}</pre>
    </div>
  );
}

