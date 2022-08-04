/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { createContext, useContext } from 'react';

const DataContext = createContext(null);

export function DataProvider({ children, resources }) {
  return <DataContext.Provider value={resources}>{children}</DataContext.Provider>;
}

export function useResources() {
  const resources = useContext(DataContext);
  return resources
}
