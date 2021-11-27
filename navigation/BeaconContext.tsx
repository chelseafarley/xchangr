import React from 'react';

import { XchangrAppState } from '../types';

const BeaconContext = React.createContext<XchangrAppState>({
  Exchanges: [],
  IsLoading: false,
  AddExchange: async (exchange) => {},
  DeleteExchange: async (exchange) => {}
});
export default BeaconContext