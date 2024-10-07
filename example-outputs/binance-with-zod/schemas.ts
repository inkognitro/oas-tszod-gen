import {z} from 'zod';

export type Error = {
  code: number; // int
  msg: string;
};

export const z_Error = z.object({
  code: z.number().int().safe().finite(),
  msg: z.string(),
});

export type Trade = {
  id: number; // int
  price: string;
  qty: string;
  quoteQty: string;
  time: number; // int
  isBuyerMaker: boolean;
  isBestMatch: boolean;
};

export const z_Trade = z.object({
  id: z.number().int().safe().finite(),
  price: z.string(),
  qty: z.string(),
  quoteQty: z.string(),
  time: z.number().int().safe().finite(),
  isBuyerMaker: z.boolean(),
  isBestMatch: z.boolean(),
});

export type AggTrade = {
  a: number; // int
  p: string;
  q: string;
  f: number; // int
  l: number; // int
  T: boolean;
  m: boolean;
  M: boolean;
};

export const z_AggTrade = z.object({
  a: z.number().int().safe().finite(),
  p: z.string(),
  q: z.string(),
  f: z.number().int().safe().finite(),
  l: z.number().int().safe().finite(),
  T: z.boolean(),
  m: z.boolean(),
  M: z.boolean(),
});

export type Ticker = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  prevClosePrice: string;
  lastPrice: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number; // int
  closeTime: number; // int
  firstId: number; // int
  lastId: number; // int
  count: number; // int
};

export const z_Ticker = z.object({
  symbol: z.string(),
  priceChange: z.string(),
  priceChangePercent: z.string(),
  prevClosePrice: z.string(),
  lastPrice: z.string(),
  bidPrice: z.string(),
  bidQty: z.string(),
  askPrice: z.string(),
  askQty: z.string(),
  openPrice: z.string(),
  highPrice: z.string(),
  lowPrice: z.string(),
  volume: z.string(),
  quoteVolume: z.string(),
  openTime: z.number().int().safe().finite(),
  closeTime: z.number().int().safe().finite(),
  firstId: z.number().int().safe().finite(),
  lastId: z.number().int().safe().finite(),
  count: z.number().int().safe().finite(),
});

export type TickerList = Ticker[];

export const z_TickerList = z.array(z_Ticker);

export type DayTicker = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number; // int
  closeTime: number; // int
  firstId: number; // int
  lastId: number; // int
  count: number; // int
};

export const z_DayTicker = z.object({
  symbol: z.string(),
  priceChange: z.string(),
  priceChangePercent: z.string(),
  weightedAvgPrice: z.string(),
  openPrice: z.string(),
  highPrice: z.string(),
  lowPrice: z.string(),
  lastPrice: z.string(),
  volume: z.string(),
  quoteVolume: z.string(),
  openTime: z.number().int().safe().finite(),
  closeTime: z.number().int().safe().finite(),
  firstId: z.number().int().safe().finite(),
  lastId: z.number().int().safe().finite(),
  count: z.number().int().safe().finite(),
});

export type DayTickerList = DayTicker[];

export const z_DayTickerList = z.array(z_DayTicker);

export type PriceTicker = {
  symbol: string;
  price: string;
};

export const z_PriceTicker = z.object({
  symbol: z.string(),
  price: z.string(),
});

export type PriceTickerList = PriceTicker[];

export const z_PriceTickerList = z.array(z_PriceTicker);

export type BookTicker = {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
};

export const z_BookTicker = z.object({
  symbol: z.string(),
  bidPrice: z.string(),
  bidQty: z.string(),
  askPrice: z.string(),
  askQty: z.string(),
});

export type BookTickerList = BookTicker[];

export const z_BookTickerList = z.array(z_BookTicker);

export type OrderDetails = {
  symbol: string;
  orderId: number; // int
  orderListId: number; // int
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  stopPrice: string;
  icebergQty: string;
  time: number; // int
  updateTime: number; // int
  isWorking: boolean;
  workingTime: number; // int
  origQuoteOrderQty: string;
  selfTradePreventionMode: string;
  preventedMatchId?: number; // int
  preventedQuantity?: string;
};

export const z_OrderDetails = z.object({
  symbol: z.string(),
  orderId: z.number().int().safe().finite(),
  orderListId: z.number().int().safe().finite(),
  clientOrderId: z.string(),
  price: z.string(),
  origQty: z.string(),
  executedQty: z.string(),
  cummulativeQuoteQty: z.string(),
  status: z.string(),
  timeInForce: z.string(),
  type: z.string(),
  side: z.string(),
  stopPrice: z.string(),
  icebergQty: z.string(),
  time: z.number().int().safe().finite(),
  updateTime: z.number().int().safe().finite(),
  isWorking: z.boolean(),
  workingTime: z.number().int().safe().finite(),
  origQuoteOrderQty: z.string(),
  selfTradePreventionMode: z.string(),
  preventedMatchId: z.number().int().safe().finite().optional(),
  preventedQuantity: z.string().optional(),
});

export type OrderResponseAck = {
  symbol: string;
  orderId: number; // int
  orderListId: number; // int
  clientOrderId: string;
  transactTime: number; // int
};

export const z_OrderResponseAck = z.object({
  symbol: z.string(),
  orderId: z.number().int().safe().finite(),
  orderListId: z.number().int().safe().finite(),
  clientOrderId: z.string(),
  transactTime: z.number().int().safe().finite(),
});

export type OrderResponseResult = {
  symbol: string;
  orderId: number; // int
  orderListId: number; // int
  clientOrderId: string;
  transactTime: number; // int
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  strategyId?: number; // int
  strategyType?: number; // int
  workingTime: number; // int
  selfTradePreventionMode: string;
};

export const z_OrderResponseResult = z.object({
  symbol: z.string(),
  orderId: z.number().int().safe().finite(),
  orderListId: z.number().int().safe().finite(),
  clientOrderId: z.string(),
  transactTime: z.number().int().safe().finite(),
  price: z.string(),
  origQty: z.string(),
  executedQty: z.string(),
  cummulativeQuoteQty: z.string(),
  status: z.string(),
  timeInForce: z.string(),
  type: z.string(),
  side: z.string(),
  strategyId: z.number().int().safe().finite().optional(),
  strategyType: z.number().int().safe().finite().optional(),
  workingTime: z.number().int().safe().finite(),
  selfTradePreventionMode: z.string(),
});

export type OrderResponseFull = {
  symbol: string;
  orderId: number; // int
  orderListId: number; // int
  clientOrderId: string;
  transactTime: number; // int
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  strategyId?: number; // int
  strategyType?: number; // int
  workingTime: number; // int
  selfTradePreventionMode: string;
  fills: {
    price: string;
    qty: string;
    commission: string;
    commissionAsset: string;
  }[];
};

export const z_OrderResponseFull = z.object({
  symbol: z.string(),
  orderId: z.number().int().safe().finite(),
  orderListId: z.number().int().safe().finite(),
  clientOrderId: z.string(),
  transactTime: z.number().int().safe().finite(),
  price: z.string(),
  origQty: z.string(),
  executedQty: z.string(),
  cummulativeQuoteQty: z.string(),
  status: z.string(),
  timeInForce: z.string(),
  type: z.string(),
  side: z.string(),
  strategyId: z.number().int().safe().finite().optional(),
  strategyType: z.number().int().safe().finite().optional(),
  workingTime: z.number().int().safe().finite(),
  selfTradePreventionMode: z.string(),
  fills: z.array(
    z.object({
      price: z.string(),
      qty: z.string(),
      commission: z.string(),
      commissionAsset: z.string(),
    })
  ),
});

export type Order = {
  symbol: string;
  origClientOrderId: string;
  orderId: number; // int
  orderListId: number; // int
  clientOrderId: string;
  transactTime: number; // int
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  selfTradePreventionMode: string;
};

export const z_Order = z.object({
  symbol: z.string(),
  origClientOrderId: z.string(),
  orderId: z.number().int().safe().finite(),
  orderListId: z.number().int().safe().finite(),
  clientOrderId: z.string(),
  transactTime: z.number().int().safe().finite(),
  price: z.string(),
  origQty: z.string(),
  executedQty: z.string(),
  cummulativeQuoteQty: z.string(),
  status: z.string(),
  timeInForce: z.string(),
  type: z.string(),
  side: z.string(),
  selfTradePreventionMode: z.string(),
});

export type OcoOrder = {
  orderListId: number; // int
  contingencyType: string;
  listStatusType: string;
  listOrderStatus: string;
  listClientOrderId: string;
  transactionTime: number; // int
  symbol: string;
  orders: {
    symbol: string;
    orderId: number; // int
    clientOrderId: string;
  }[];
  orderReports: {
    symbol: string;
    origClientOrderId: string;
    orderId: number; // int
    orderListId: number; // int
    clientOrderId: string;
    price: string;
    origQty: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    status: string;
    timeInForce: string;
    type: string;
    side: string;
    stopPrice: string;
    selfTradePreventionMode: string;
    transactTime: number; // int
  }[];
};

export const z_OcoOrder = z.object({
  orderListId: z.number().int().safe().finite(),
  contingencyType: z.string(),
  listStatusType: z.string(),
  listOrderStatus: z.string(),
  listClientOrderId: z.string(),
  transactionTime: z.number().int().safe().finite(),
  symbol: z.string(),
  orders: z.array(
    z.object({
      symbol: z.string(),
      orderId: z.number().int().safe().finite(),
      clientOrderId: z.string(),
    })
  ),
  orderReports: z.array(
    z.object({
      symbol: z.string(),
      origClientOrderId: z.string(),
      orderId: z.number().int().safe().finite(),
      orderListId: z.number().int().safe().finite(),
      clientOrderId: z.string(),
      price: z.string(),
      origQty: z.string(),
      executedQty: z.string(),
      cummulativeQuoteQty: z.string(),
      status: z.string(),
      timeInForce: z.string(),
      type: z.string(),
      side: z.string(),
      stopPrice: z.string(),
      selfTradePreventionMode: z.string(),
      transactTime: z.number().int().safe().finite(),
    })
  ),
});

export type Account = {
  makerCommission: number; // int
  takerCommission: number; // int
  buyerCommission: number; // int
  sellerCommission: number; // int
  commissionRates: {
    maker: string;
    taker: string;
    buyer: string;
    seller: string;
  };
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  brokered: boolean;
  requireSelfTradePrevention: boolean;
  preventSor: boolean;
  updateTime: number; // int
  accountType: string;
  balances: {
    asset: string;
    free: string;
    locked: string;
  }[];
  permissions: string[];
  uid: number; // int
};

export const z_Account = z.object({
  makerCommission: z.number().int().safe().finite(),
  takerCommission: z.number().int().safe().finite(),
  buyerCommission: z.number().int().safe().finite(),
  sellerCommission: z.number().int().safe().finite(),
  commissionRates: z.object({
    maker: z.string(),
    taker: z.string(),
    buyer: z.string(),
    seller: z.string(),
  }),
  canTrade: z.boolean(),
  canWithdraw: z.boolean(),
  canDeposit: z.boolean(),
  brokered: z.boolean(),
  requireSelfTradePrevention: z.boolean(),
  preventSor: z.boolean(),
  updateTime: z.number().int().safe().finite(),
  accountType: z.string(),
  balances: z.array(
    z.object({
      asset: z.string(),
      free: z.string(),
      locked: z.string(),
    })
  ),
  permissions: z.array(z.string()),
  uid: z.number().int().safe().finite(),
});

export type MyTrade = {
  symbol: string;
  id: number; // int
  orderId: number; // int
  orderListId: number; // int
  price: string;
  qty: string;
  quoteQty: string;
  commission: string;
  commissionAsset: string;
  time: number; // int
  isBuyer: boolean;
  isMaker: boolean;
  isBestMatch: boolean;
};

export const z_MyTrade = z.object({
  symbol: z.string(),
  id: z.number().int().safe().finite(),
  orderId: z.number().int().safe().finite(),
  orderListId: z.number().int().safe().finite(),
  price: z.string(),
  qty: z.string(),
  quoteQty: z.string(),
  commission: z.string(),
  commissionAsset: z.string(),
  time: z.number().int().safe().finite(),
  isBuyer: z.boolean(),
  isMaker: z.boolean(),
  isBestMatch: z.boolean(),
});

export type MarginOrderDetail = {
  clientOrderId: string;
  cummulativeQuoteQty: string;
  executedQty: string;
  icebergQty: string;
  isWorking: boolean;
  orderId: number; // int
  origQty: string;
  price: string;
  side: string;
  status: string;
  stopPrice: string;
  symbol: string;
  isIsolated: boolean;
  time: number; // int
  timeInForce: string;
  type: string;
  updateTime: number; // int
  selfTradePreventionMode: string;
};

export const z_MarginOrderDetail = z.object({
  clientOrderId: z.string(),
  cummulativeQuoteQty: z.string(),
  executedQty: z.string(),
  icebergQty: z.string(),
  isWorking: z.boolean(),
  orderId: z.number().int().safe().finite(),
  origQty: z.string(),
  price: z.string(),
  side: z.string(),
  status: z.string(),
  stopPrice: z.string(),
  symbol: z.string(),
  isIsolated: z.boolean(),
  time: z.number().int().safe().finite(),
  timeInForce: z.string(),
  type: z.string(),
  updateTime: z.number().int().safe().finite(),
  selfTradePreventionMode: z.string(),
});

export type MarginOrderResponseAck = {
  symbol: string;
  orderId: number; // int
  clientOrderId: string;
  isIsolated: boolean;
  transactTime: number; // int
};

export const z_MarginOrderResponseAck = z.object({
  symbol: z.string(),
  orderId: z.number().int().safe().finite(),
  clientOrderId: z.string(),
  isIsolated: z.boolean(),
  transactTime: z.number().int().safe().finite(),
});

export type MarginOrderResponseResult = {
  symbol: string;
  orderId: number; // int
  clientOrderId: string;
  transactTime: number; // int
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  isIsolated: boolean;
  side: string;
};

export const z_MarginOrderResponseResult = z.object({
  symbol: z.string(),
  orderId: z.number().int().safe().finite(),
  clientOrderId: z.string(),
  transactTime: z.number().int().safe().finite(),
  price: z.string(),
  origQty: z.string(),
  executedQty: z.string(),
  cummulativeQuoteQty: z.string(),
  status: z.string(),
  timeInForce: z.string(),
  type: z.string(),
  isIsolated: z.boolean(),
  side: z.string(),
});

export type MarginOrderResponseFull = {
  symbol: string;
  orderId: number; // int
  clientOrderId: string;
  transactTime: number; // int
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  marginBuyBorrowAmount: number;
  marginBuyBorrowAsset: string;
  isIsolated: boolean;
  fills: {
    price: string;
    qty: string;
    commission: string;
    commissionAsset: string;
  }[];
};

export const z_MarginOrderResponseFull = z.object({
  symbol: z.string(),
  orderId: z.number().int().safe().finite(),
  clientOrderId: z.string(),
  transactTime: z.number().int().safe().finite(),
  price: z.string(),
  origQty: z.string(),
  executedQty: z.string(),
  cummulativeQuoteQty: z.string(),
  status: z.string(),
  timeInForce: z.string(),
  type: z.string(),
  side: z.string(),
  marginBuyBorrowAmount: z.number().safe().finite(),
  marginBuyBorrowAsset: z.string(),
  isIsolated: z.boolean(),
  fills: z.array(
    z.object({
      price: z.string(),
      qty: z.string(),
      commission: z.string(),
      commissionAsset: z.string(),
    })
  ),
});

export type MarginOrder = {
  symbol: string;
  orderId: number; // int
  origClientOrderId: string;
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
};

export const z_MarginOrder = z.object({
  symbol: z.string(),
  orderId: z.number().int().safe().finite(),
  origClientOrderId: z.string(),
  clientOrderId: z.string(),
  price: z.string(),
  origQty: z.string(),
  executedQty: z.string(),
  cummulativeQuoteQty: z.string(),
  status: z.string(),
  timeInForce: z.string(),
  type: z.string(),
  side: z.string(),
});

export type CanceledMarginOrderDetail = {
  symbol: string;
  isIsolated: boolean;
  origClientOrderId: string;
  orderId: number; // int
  orderListId: number; // int
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
};

export const z_CanceledMarginOrderDetail = z.object({
  symbol: z.string(),
  isIsolated: z.boolean(),
  origClientOrderId: z.string(),
  orderId: z.number().int().safe().finite(),
  orderListId: z.number().int().safe().finite(),
  clientOrderId: z.string(),
  price: z.string(),
  origQty: z.string(),
  executedQty: z.string(),
  cummulativeQuoteQty: z.string(),
  status: z.string(),
  timeInForce: z.string(),
  type: z.string(),
  side: z.string(),
});

export type MarginOcoOrder = {
  orderListId: number; // int
  contingencyType: string;
  listStatusType: string;
  listOrderStatus: string;
  listClientOrderId: string;
  transactionTime: number; // int
  symbol: string;
  isIsolated: boolean;
  orders: {
    symbol: string;
    orderId: number; // int
    clientOrderId: string;
  }[];
  orderReports: {
    symbol: string;
    origClientOrderId: string;
    orderId: number; // int
    orderListId: number; // int
    clientOrderId: string;
    price: string;
    origQty: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    status: string;
    timeInForce: string;
    type: string;
    side: string;
    stopPrice: string;
  }[];
};

export const z_MarginOcoOrder = z.object({
  orderListId: z.number().int().safe().finite(),
  contingencyType: z.string(),
  listStatusType: z.string(),
  listOrderStatus: z.string(),
  listClientOrderId: z.string(),
  transactionTime: z.number().int().safe().finite(),
  symbol: z.string(),
  isIsolated: z.boolean(),
  orders: z.array(
    z.object({
      symbol: z.string(),
      orderId: z.number().int().safe().finite(),
      clientOrderId: z.string(),
    })
  ),
  orderReports: z.array(
    z.object({
      symbol: z.string(),
      origClientOrderId: z.string(),
      orderId: z.number().int().safe().finite(),
      orderListId: z.number().int().safe().finite(),
      clientOrderId: z.string(),
      price: z.string(),
      origQty: z.string(),
      executedQty: z.string(),
      cummulativeQuoteQty: z.string(),
      status: z.string(),
      timeInForce: z.string(),
      type: z.string(),
      side: z.string(),
      stopPrice: z.string(),
    })
  ),
});

export type MarginTrade = {
  commission: string;
  commissionAsset: string;
  id: number; // int
  isBestMatch: boolean;
  isBuyer: boolean;
  isMaker: boolean;
  orderId: number; // int
  price: string;
  qty: string;
  symbol: string;
  isIsolated: boolean;
  time: number; // int
};

export const z_MarginTrade = z.object({
  commission: z.string(),
  commissionAsset: z.string(),
  id: z.number().int().safe().finite(),
  isBestMatch: z.boolean(),
  isBuyer: z.boolean(),
  isMaker: z.boolean(),
  orderId: z.number().int().safe().finite(),
  price: z.string(),
  qty: z.string(),
  symbol: z.string(),
  isIsolated: z.boolean(),
  time: z.number().int().safe().finite(),
});

export type IsolatedMarginAccountInfo = {
  assets: {
    baseAsset: {
      asset: string;
      borrowEnabled: boolean;
      borrowed: string;
      free: string;
      interest: string;
      locked: string;
      netAsset: string;
      netAssetOfBtc: string;
      repayEnabled: boolean;
      totalAsset: string;
    };
    quoteAsset: {
      asset: string;
      borrowEnabled: boolean;
      borrowed: string;
      free: string;
      interest: string;
      locked: string;
      netAsset: string;
      netAssetOfBtc: string;
      repayEnabled: boolean;
      totalAsset: string;
    };
    symbol: string;
    isolatedCreated: boolean;
    enabled: boolean;
    marginLevel: string;
    marginLevelStatus: string;
    marginRatio: string;
    indexPrice: string;
    liquidatePrice: string;
    liquidateRate: string;
    tradeEnabled: boolean;
  }[];
  totalAssetOfBtc: string;
  totalLiabilityOfBtc: string;
  totalNetAssetOfBtc: string;
};

export const z_IsolatedMarginAccountInfo = z.object({
  assets: z.array(
    z.object({
      baseAsset: z.object({
        asset: z.string(),
        borrowEnabled: z.boolean(),
        borrowed: z.string(),
        free: z.string(),
        interest: z.string(),
        locked: z.string(),
        netAsset: z.string(),
        netAssetOfBtc: z.string(),
        repayEnabled: z.boolean(),
        totalAsset: z.string(),
      }),
      quoteAsset: z.object({
        asset: z.string(),
        borrowEnabled: z.boolean(),
        borrowed: z.string(),
        free: z.string(),
        interest: z.string(),
        locked: z.string(),
        netAsset: z.string(),
        netAssetOfBtc: z.string(),
        repayEnabled: z.boolean(),
        totalAsset: z.string(),
      }),
      symbol: z.string(),
      isolatedCreated: z.boolean(),
      enabled: z.boolean(),
      marginLevel: z.string(),
      marginLevelStatus: z.string(),
      marginRatio: z.string(),
      indexPrice: z.string(),
      liquidatePrice: z.string(),
      liquidateRate: z.string(),
      tradeEnabled: z.boolean(),
    })
  ),
  totalAssetOfBtc: z.string(),
  totalLiabilityOfBtc: z.string(),
  totalNetAssetOfBtc: z.string(),
});

export type BnbBurnStatus = {
  spotBNBBurn: boolean;
  interestBNBBurn: boolean;
};

export const z_BnbBurnStatus = z.object({
  spotBNBBurn: z.boolean(),
  interestBNBBurn: z.boolean(),
});

export type SnapshotSpot = {
  code: number; // int
  msg: string;
  snapshotVos: {
    data: {
      balances: {
        asset: string;
        free: string;
        locked: string;
      }[];
      totalAssetOfBtc: string;
    };
    type: string;
    updateTime: number; // int
  }[];
};

export const z_SnapshotSpot = z.object({
  code: z.number().int().safe().finite(),
  msg: z.string(),
  snapshotVos: z.array(
    z.object({
      data: z.object({
        balances: z.array(
          z.object({
            asset: z.string(),
            free: z.string(),
            locked: z.string(),
          })
        ),
        totalAssetOfBtc: z.string(),
      }),
      type: z.string(),
      updateTime: z.number().int().safe().finite(),
    })
  ),
});

export type SnapshotMargin = {
  code: number; // int
  msg: string;
  snapshotVos: {
    data: {
      marginLevel: string;
      totalAssetOfBtc: string;
      totalLiabilityOfBtc: string;
      totalNetAssetOfBtc: string;
      userAssets: {
        asset: string;
        borrowed: string;
        free: string;
        interest: string;
        locked: string;
        netAsset: string;
      }[];
    };
    type: string;
    updateTime: number; // int
  }[];
};

export const z_SnapshotMargin = z.object({
  code: z.number().int().safe().finite(),
  msg: z.string(),
  snapshotVos: z.array(
    z.object({
      data: z.object({
        marginLevel: z.string(),
        totalAssetOfBtc: z.string(),
        totalLiabilityOfBtc: z.string(),
        totalNetAssetOfBtc: z.string(),
        userAssets: z.array(
          z.object({
            asset: z.string(),
            borrowed: z.string(),
            free: z.string(),
            interest: z.string(),
            locked: z.string(),
            netAsset: z.string(),
          })
        ),
      }),
      type: z.string(),
      updateTime: z.number().int().safe().finite(),
    })
  ),
});

export type SnapshotFutures = {
  code: number; // int
  msg: string;
  snapshotVos: {
    data: {
      assets: {
        asset: string;
        marginBalance: string;
        walletBalance: string;
      }[];
      position: {
        entryPrice: string;
        markPrice: string;
        positionAmt: string;
        symbol: string;
        unRealizedProfit: string;
      }[];
    };
    type: string;
    updateTime: number; // int
  }[];
};

export const z_SnapshotFutures = z.object({
  code: z.number().int().safe().finite(),
  msg: z.string(),
  snapshotVos: z.array(
    z.object({
      data: z.object({
        assets: z.array(
          z.object({
            asset: z.string(),
            marginBalance: z.string(),
            walletBalance: z.string(),
          })
        ),
        position: z.array(
          z.object({
            entryPrice: z.string(),
            markPrice: z.string(),
            positionAmt: z.string(),
            symbol: z.string(),
            unRealizedProfit: z.string(),
          })
        ),
      }),
      type: z.string(),
      updateTime: z.number().int().safe().finite(),
    })
  ),
});

export type SubAccountUSDTFuturesDetails = {
  futureAccountResp: {
    email: string;
    assets: {
      asset: string;
      initialMargin: string;
      maintenanceMargin: string;
      marginBalance: string;
      maxWithdrawAmount: string;
      openOrderInitialMargin: string;
      positionInitialMargin: string;
      unrealizedProfit: string;
      walletBalance: string;
    }[];
    canDeposit: boolean;
    canTrade: boolean;
    canWithdraw: boolean;
    feeTier: number; // int
    maxWithdrawAmount: string;
    totalInitialMargin: string;
    totalMaintenanceMargin: string;
    totalMarginBalance: string;
    totalOpenOrderInitialMargin: string;
    totalPositionInitialMargin: string;
    totalUnrealizedProfit: string;
    totalWalletBalance: string;
    updateTime: number; // int
  };
};

export const z_SubAccountUSDTFuturesDetails = z.object({
  futureAccountResp: z.object({
    email: z.string(),
    assets: z.array(
      z.object({
        asset: z.string(),
        initialMargin: z.string(),
        maintenanceMargin: z.string(),
        marginBalance: z.string(),
        maxWithdrawAmount: z.string(),
        openOrderInitialMargin: z.string(),
        positionInitialMargin: z.string(),
        unrealizedProfit: z.string(),
        walletBalance: z.string(),
      })
    ),
    canDeposit: z.boolean(),
    canTrade: z.boolean(),
    canWithdraw: z.boolean(),
    feeTier: z.number().int().safe().finite(),
    maxWithdrawAmount: z.string(),
    totalInitialMargin: z.string(),
    totalMaintenanceMargin: z.string(),
    totalMarginBalance: z.string(),
    totalOpenOrderInitialMargin: z.string(),
    totalPositionInitialMargin: z.string(),
    totalUnrealizedProfit: z.string(),
    totalWalletBalance: z.string(),
    updateTime: z.number().int().safe().finite(),
  }),
});

export type SubAccountCOINFuturesDetails = {
  email: string;
  assets: {
    asset: string;
    initialMargin: string;
    maintenanceMargin: string;
    marginBalance: string;
    maxWithdrawAmount: string;
    openOrderInitialMargin: string;
    positionInitialMargin: string;
    unrealizedProfit: string;
    walletBalance: string;
  }[];
  canDeposit: boolean;
  canTrade: boolean;
  canWithdraw: boolean;
  feeTier: number; // int
  updateTime: number; // int
};

export const z_SubAccountCOINFuturesDetails = z.object({
  email: z.string(),
  assets: z.array(
    z.object({
      asset: z.string(),
      initialMargin: z.string(),
      maintenanceMargin: z.string(),
      marginBalance: z.string(),
      maxWithdrawAmount: z.string(),
      openOrderInitialMargin: z.string(),
      positionInitialMargin: z.string(),
      unrealizedProfit: z.string(),
      walletBalance: z.string(),
    })
  ),
  canDeposit: z.boolean(),
  canTrade: z.boolean(),
  canWithdraw: z.boolean(),
  feeTier: z.number().int().safe().finite(),
  updateTime: z.number().int().safe().finite(),
});

export type SubAccountUSDTFuturesSummary = {
  futureAccountSummaryResp: {
    totalInitialMargin: string;
    totalMaintenanceMargin: string;
    totalMarginBalance: string;
    totalOpenOrderInitialMargin: string;
    totalPositionInitialMargin: string;
    totalUnrealizedProfit: string;
    totalWalletBalance: string;
    asset: string;
    subAccountList: {
      email: string;
      totalInitialMargin: string;
      totalMaintenanceMargin: string;
      totalMarginBalance: string;
      totalOpenOrderInitialMargin: string;
      totalPositionInitialMargin: string;
      totalUnrealizedProfit: string;
      totalWalletBalance: string;
      asset: string;
    }[];
  };
};

export const z_SubAccountUSDTFuturesSummary = z.object({
  futureAccountSummaryResp: z.object({
    totalInitialMargin: z.string(),
    totalMaintenanceMargin: z.string(),
    totalMarginBalance: z.string(),
    totalOpenOrderInitialMargin: z.string(),
    totalPositionInitialMargin: z.string(),
    totalUnrealizedProfit: z.string(),
    totalWalletBalance: z.string(),
    asset: z.string(),
    subAccountList: z.array(
      z.object({
        email: z.string(),
        totalInitialMargin: z.string(),
        totalMaintenanceMargin: z.string(),
        totalMarginBalance: z.string(),
        totalOpenOrderInitialMargin: z.string(),
        totalPositionInitialMargin: z.string(),
        totalUnrealizedProfit: z.string(),
        totalWalletBalance: z.string(),
        asset: z.string(),
      })
    ),
  }),
});

export type SubAccountCOINFuturesSummary = {
  deliveryAccountSummaryResp: {
    totalMarginBalanceOfBTC: string;
    totalUnrealizedProfitOfBTC: string;
    totalWalletBalanceOfBTC: string;
    asset: string;
    subAccountList: {
      email: string;
      totalMarginBalance: string;
      totalUnrealizedProfit: string;
      totalWalletBalance: string;
      asset: string;
    }[];
  };
};

export const z_SubAccountCOINFuturesSummary = z.object({
  deliveryAccountSummaryResp: z.object({
    totalMarginBalanceOfBTC: z.string(),
    totalUnrealizedProfitOfBTC: z.string(),
    totalWalletBalanceOfBTC: z.string(),
    asset: z.string(),
    subAccountList: z.array(
      z.object({
        email: z.string(),
        totalMarginBalance: z.string(),
        totalUnrealizedProfit: z.string(),
        totalWalletBalance: z.string(),
        asset: z.string(),
      })
    ),
  }),
});

export type SubAccountUSDTFuturesPositionRisk = {
  futurePositionRiskVos: {
    entryPrice: string;
    leverage: string;
    maxNotional: string;
    liquidationPrice: string;
    markPrice: string;
    positionAmount: string;
    symbol: string;
    unrealizedProfit: string;
  }[];
};

export const z_SubAccountUSDTFuturesPositionRisk = z.object({
  futurePositionRiskVos: z.array(
    z.object({
      entryPrice: z.string(),
      leverage: z.string(),
      maxNotional: z.string(),
      liquidationPrice: z.string(),
      markPrice: z.string(),
      positionAmount: z.string(),
      symbol: z.string(),
      unrealizedProfit: z.string(),
    })
  ),
});

export type SubAccountCOINFuturesPositionRisk = {
  deliveryPositionRiskVos: {
    entryPrice: string;
    markPrice: string;
    leverage: string;
    isolated: string;
    isolatedWallet: string;
    isolatedMargin: string;
    isAutoAddMargin: string;
    positionSide: string;
    positionAmount: string;
    symbol: string;
    unrealizedProfit: string;
  }[];
};

export const z_SubAccountCOINFuturesPositionRisk = z.object({
  deliveryPositionRiskVos: z.array(
    z.object({
      entryPrice: z.string(),
      markPrice: z.string(),
      leverage: z.string(),
      isolated: z.string(),
      isolatedWallet: z.string(),
      isolatedMargin: z.string(),
      isAutoAddMargin: z.string(),
      positionSide: z.string(),
      positionAmount: z.string(),
      symbol: z.string(),
      unrealizedProfit: z.string(),
    })
  ),
});

export type RepaymentInfo = {
  loanCoin: string;
  remainingPrincipal: string;
  remainingInterest: string;
  collateralCoin: string;
  remainingCollateral: string;
  currentLTV: string;
  repayStatus: string;
};

export const z_RepaymentInfo = z.object({
  loanCoin: z.string(),
  remainingPrincipal: z.string(),
  remainingInterest: z.string(),
  collateralCoin: z.string(),
  remainingCollateral: z.string(),
  currentLTV: z.string(),
  repayStatus: z.string(),
});

export type RepaymentInfo2 = {
  loanCoin: string;
  collateralCoin: string;
  repayStatus: string;
};

export const z_RepaymentInfo2 = z.object({
  loanCoin: z.string(),
  collateralCoin: z.string(),
  repayStatus: z.string(),
});
