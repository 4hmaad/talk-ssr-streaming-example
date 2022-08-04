/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react";
// import {renderToString} from 'react-dom/server';
import { renderToPipeableStream } from "react-dom/server";
import App from "../src/App";
import { DataProvider } from "../src/data";
import { createResource, storefrontClient } from "../src/lib";
import { ABORT_DELAY } from "./delays";


module.exports = function render(url, res) {
  // This is how you would wire it up previously:
  //

  // res.send(
  //   '<!DOCTYPE html>' +
  //   renderToString(
  //     <DataProvider data={data}>
  //       <App assets={assets} />
  //     </DataProvider>,
  //   )
  // );

  // The new wiring is a bit more involved.
  res.socket.on("error", (error) => {
    console.error("Fatal", error);
  });
  let didError = false;


  const delay = (d = 1000) => new Promise(r => setTimeout(_ => r(_), d))

  const productResource = createResource(storefrontClient.product.getProduct({ sku: 'FUR_BED_02' }))
  const searchResource = createResource(delay(3000).then(() => storefrontClient.product.searchProducts({ keyword: 'Furniture' }, { first: 4 })))
  const menuResource = createResource(storefrontClient.xm.getMenu())
  const globalElements = createResource(storefrontClient.xm.getGlobalElements())

  const stream = renderToPipeableStream(
    <DataProvider resources={{ product: productResource, search: searchResource, globalElements: globalElements, menu: menuResource }}>
      <App />
    </DataProvider>,
    {
      onShellReady() {
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        stream.pipe(res);
      },
      onError(x) {
        didError = true;
        console.error({ x });
      }
    }
  );
  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
  setTimeout(() => stream.abort(), ABORT_DELAY);
};
