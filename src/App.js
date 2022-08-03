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
import Spinner from "./Spinner";
import Layout from "./Layout";
import NavBar from "./NavBar";
import ProductGallery from "./components/product-gallery";
import ProductInfo from "./components/product-info";
import ProductList from "./components/product-list";

// const Comments = lazy(() => import("./Comments" /* webpackPrefetch: true */));
// const Sidebar = lazy(() => import("./Sidebar" /* webpackPrefetch: true */));
// const Post = lazy(() => import("./Post" /* webpackPrefetch: true */));

export default function App({ assets }) {
  return (
    <Html assets={assets} title="Hello">
      <Suspense fallback={<Spinner />}>
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
      <NavBar />
      <div className="bg-white">
        <div className="max-w-4xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            <ProductGallery product={{}} />
            <ProductInfo product={{}} cartId={""} />
          </div>
        </div>
      </div>
      {/* <Suspense fallback="Loading products"> */}
      <ProductList />
      {/* </Suspense> */}
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
