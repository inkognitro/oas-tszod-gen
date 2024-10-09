export type Error = {
'code': number; // int
'msg': string;
}

export type Trade = {
'id': number; // int
'price': string;
'qty': string;
'quoteQty': string;
'time': number; // int
'isBuyerMaker': boolean;
'isBestMatch': boolean;
}

export type AggTrade = {
'a': number; // int
'p': string;
'q': string;
'f': number; // int
'l': number; // int
'T': boolean;
'm': boolean;
'M': boolean;
}

export type Ticker = {
'symbol': string;
'priceChange': string;
'priceChangePercent': string;
'prevClosePrice': string;
'lastPrice': string;
'bidPrice': string;
'bidQty': string;
'askPrice': string;
'askQty': string;
'openPrice': string;
'highPrice': string;
'lowPrice': string;
'volume': string;
'quoteVolume': string;
'openTime': number; // int
'closeTime': number; // int
'firstId': number; // int
'lastId': number; // int
'count': number; // int
}

export type TickerList = (
Ticker
)[]

export type DayTicker = {
'symbol': string;
'priceChange': string;
'priceChangePercent': string;
'weightedAvgPrice': string;
'openPrice': string;
'highPrice': string;
'lowPrice': string;
'lastPrice': string;
'volume': string;
'quoteVolume': string;
'openTime': number; // int
'closeTime': number; // int
'firstId': number; // int
'lastId': number; // int
'count': number; // int
}

export type DayTickerList = (
DayTicker
)[]

export type PriceTicker = {
'symbol': string;
'price': string;
}

export type PriceTickerList = (
PriceTicker
)[]

export type BookTicker = {
'symbol': string;
'bidPrice': string;
'bidQty': string;
'askPrice': string;
'askQty': string;
}

export type BookTickerList = (
BookTicker
)[]

export type OrderDetails = {
'symbol': string;
'orderId': number; // int
'orderListId': number; // int
'clientOrderId': string;
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'side': string;
'stopPrice': string;
'icebergQty': string;
'time': number; // int
'updateTime': number; // int
'isWorking': boolean;
'workingTime': number; // int
'origQuoteOrderQty': string;
'selfTradePreventionMode': string;
'preventedMatchId'?: number; // int
'preventedQuantity'?: string;
}

export type OrderResponseAck = {
'symbol': string;
'orderId': number; // int
'orderListId': number; // int
'clientOrderId': string;
'transactTime': number; // int
}

export type OrderResponseResult = {
'symbol': string;
'orderId': number; // int
'orderListId': number; // int
'clientOrderId': string;
'transactTime': number; // int
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'side': string;
'strategyId'?: number; // int
'strategyType'?: number; // int
'workingTime': number; // int
'selfTradePreventionMode': string;
}

export type OrderResponseFull = {
'symbol': string;
'orderId': number; // int
'orderListId': number; // int
'clientOrderId': string;
'transactTime': number; // int
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'side': string;
'strategyId'?: number; // int
'strategyType'?: number; // int
'workingTime': number; // int
'selfTradePreventionMode': string;
'fills': (
{
'price': string;
'qty': string;
'commission': string;
'commissionAsset': string;
}
)[];
}

export type Order = {
'symbol': string;
'origClientOrderId': string;
'orderId': number; // int
'orderListId': number; // int
'clientOrderId': string;
'transactTime': number; // int
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'side': string;
'selfTradePreventionMode': string;
}

export type OcoOrder = {
'orderListId': number; // int
'contingencyType': string;
'listStatusType': string;
'listOrderStatus': string;
'listClientOrderId': string;
'transactionTime': number; // int
'symbol': string;
'orders': (
{
'symbol': string;
'orderId': number; // int
'clientOrderId': string;
}
)[];
'orderReports': (
{
'symbol': string;
'origClientOrderId': string;
'orderId': number; // int
'orderListId': number; // int
'clientOrderId': string;
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'side': string;
'stopPrice': string;
'selfTradePreventionMode': string;
'transactTime': number; // int
}
)[];
}

export type Account = {
'makerCommission': number; // int
'takerCommission': number; // int
'buyerCommission': number; // int
'sellerCommission': number; // int
'commissionRates': {
'maker': string;
'taker': string;
'buyer': string;
'seller': string;
};
'canTrade': boolean;
'canWithdraw': boolean;
'canDeposit': boolean;
'brokered': boolean;
'requireSelfTradePrevention': boolean;
'preventSor': boolean;
'updateTime': number; // int
'accountType': string;
'balances': (
{
'asset': string;
'free': string;
'locked': string;
}
)[];
'permissions': (
string
)[];
'uid': number; // int
}

export type MyTrade = {
'symbol': string;
'id': number; // int
'orderId': number; // int
'orderListId': number; // int
'price': string;
'qty': string;
'quoteQty': string;
'commission': string;
'commissionAsset': string;
'time': number; // int
'isBuyer': boolean;
'isMaker': boolean;
'isBestMatch': boolean;
}

export type MarginOrderDetail = {
'clientOrderId': string;
'cummulativeQuoteQty': string;
'executedQty': string;
'icebergQty': string;
'isWorking': boolean;
'orderId': number; // int
'origQty': string;
'price': string;
'side': string;
'status': string;
'stopPrice': string;
'symbol': string;
'isIsolated': boolean;
'time': number; // int
'timeInForce': string;
'type': string;
'updateTime': number; // int
'selfTradePreventionMode': string;
}

export type MarginOrderResponseAck = {
'symbol': string;
'orderId': number; // int
'clientOrderId': string;
'isIsolated': boolean;
'transactTime': number; // int
}

export type MarginOrderResponseResult = {
'symbol': string;
'orderId': number; // int
'clientOrderId': string;
'transactTime': number; // int
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'isIsolated': boolean;
'side': string;
}

export type MarginOrderResponseFull = {
'symbol': string;
'orderId': number; // int
'clientOrderId': string;
'transactTime': number; // int
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'side': string;
'marginBuyBorrowAmount': number;
'marginBuyBorrowAsset': string;
'isIsolated': boolean;
'fills': (
{
'price': string;
'qty': string;
'commission': string;
'commissionAsset': string;
}
)[];
}

export type MarginOrder = {
'symbol': string;
'orderId': number; // int
'origClientOrderId': string;
'clientOrderId': string;
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'side': string;
}

export type CanceledMarginOrderDetail = {
'symbol': string;
'isIsolated': boolean;
'origClientOrderId': string;
'orderId': number; // int
'orderListId': number; // int
'clientOrderId': string;
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'side': string;
}

export type MarginOcoOrder = {
'orderListId': number; // int
'contingencyType': string;
'listStatusType': string;
'listOrderStatus': string;
'listClientOrderId': string;
'transactionTime': number; // int
'symbol': string;
'isIsolated': boolean;
'orders': (
{
'symbol': string;
'orderId': number; // int
'clientOrderId': string;
}
)[];
'orderReports': (
{
'symbol': string;
'origClientOrderId': string;
'orderId': number; // int
'orderListId': number; // int
'clientOrderId': string;
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'side': string;
'stopPrice': string;
}
)[];
}

export type MarginTrade = {
'commission': string;
'commissionAsset': string;
'id': number; // int
'isBestMatch': boolean;
'isBuyer': boolean;
'isMaker': boolean;
'orderId': number; // int
'price': string;
'qty': string;
'symbol': string;
'isIsolated': boolean;
'time': number; // int
}

export type IsolatedMarginAccountInfo = {
'assets': (
{
'baseAsset': {
'asset': string;
'borrowEnabled': boolean;
'borrowed': string;
'free': string;
'interest': string;
'locked': string;
'netAsset': string;
'netAssetOfBtc': string;
'repayEnabled': boolean;
'totalAsset': string;
};
'quoteAsset': {
'asset': string;
'borrowEnabled': boolean;
'borrowed': string;
'free': string;
'interest': string;
'locked': string;
'netAsset': string;
'netAssetOfBtc': string;
'repayEnabled': boolean;
'totalAsset': string;
};
'symbol': string;
'isolatedCreated': boolean;
'enabled': boolean;
'marginLevel': string;
'marginLevelStatus': string;
'marginRatio': string;
'indexPrice': string;
'liquidatePrice': string;
'liquidateRate': string;
'tradeEnabled': boolean;
}
)[];
'totalAssetOfBtc': string;
'totalLiabilityOfBtc': string;
'totalNetAssetOfBtc': string;
}

export type BnbBurnStatus = {
'spotBNBBurn': boolean;
'interestBNBBurn': boolean;
}

export type SnapshotSpot = {
'code': number; // int
'msg': string;
'snapshotVos': (
{
'data': {
'balances': (
{
'asset': string;
'free': string;
'locked': string;
}
)[];
'totalAssetOfBtc': string;
};
'type': string;
'updateTime': number; // int
}
)[];
}

export type SnapshotMargin = {
'code': number; // int
'msg': string;
'snapshotVos': (
{
'data': {
'marginLevel': string;
'totalAssetOfBtc': string;
'totalLiabilityOfBtc': string;
'totalNetAssetOfBtc': string;
'userAssets': (
{
'asset': string;
'borrowed': string;
'free': string;
'interest': string;
'locked': string;
'netAsset': string;
}
)[];
};
'type': string;
'updateTime': number; // int
}
)[];
}

export type SnapshotFutures = {
'code': number; // int
'msg': string;
'snapshotVos': (
{
'data': {
'assets': (
{
'asset': string;
'marginBalance': string;
'walletBalance': string;
}
)[];
'position': (
{
'entryPrice': string;
'markPrice': string;
'positionAmt': string;
'symbol': string;
'unRealizedProfit': string;
}
)[];
};
'type': string;
'updateTime': number; // int
}
)[];
}

export type SubAccountUSDTFuturesDetails = {
'futureAccountResp': {
'email': string;
'assets': (
{
'asset': string;
'initialMargin': string;
'maintenanceMargin': string;
'marginBalance': string;
'maxWithdrawAmount': string;
'openOrderInitialMargin': string;
'positionInitialMargin': string;
'unrealizedProfit': string;
'walletBalance': string;
}
)[];
'canDeposit': boolean;
'canTrade': boolean;
'canWithdraw': boolean;
'feeTier': number; // int
'maxWithdrawAmount': string;
'totalInitialMargin': string;
'totalMaintenanceMargin': string;
'totalMarginBalance': string;
'totalOpenOrderInitialMargin': string;
'totalPositionInitialMargin': string;
'totalUnrealizedProfit': string;
'totalWalletBalance': string;
'updateTime': number; // int
};
}

export type SubAccountCOINFuturesDetails = {
'email': string;
'assets': (
{
'asset': string;
'initialMargin': string;
'maintenanceMargin': string;
'marginBalance': string;
'maxWithdrawAmount': string;
'openOrderInitialMargin': string;
'positionInitialMargin': string;
'unrealizedProfit': string;
'walletBalance': string;
}
)[];
'canDeposit': boolean;
'canTrade': boolean;
'canWithdraw': boolean;
'feeTier': number; // int
'updateTime': number; // int
}

export type SubAccountUSDTFuturesSummary = {
'futureAccountSummaryResp': {
'totalInitialMargin': string;
'totalMaintenanceMargin': string;
'totalMarginBalance': string;
'totalOpenOrderInitialMargin': string;
'totalPositionInitialMargin': string;
'totalUnrealizedProfit': string;
'totalWalletBalance': string;
'asset': string;
'subAccountList': (
{
'email': string;
'totalInitialMargin': string;
'totalMaintenanceMargin': string;
'totalMarginBalance': string;
'totalOpenOrderInitialMargin': string;
'totalPositionInitialMargin': string;
'totalUnrealizedProfit': string;
'totalWalletBalance': string;
'asset': string;
}
)[];
};
}

export type SubAccountCOINFuturesSummary = {
'deliveryAccountSummaryResp': {
'totalMarginBalanceOfBTC': string;
'totalUnrealizedProfitOfBTC': string;
'totalWalletBalanceOfBTC': string;
'asset': string;
'subAccountList': (
{
'email': string;
'totalMarginBalance': string;
'totalUnrealizedProfit': string;
'totalWalletBalance': string;
'asset': string;
}
)[];
};
}

export type SubAccountUSDTFuturesPositionRisk = {
'futurePositionRiskVos': (
{
'entryPrice': string;
'leverage': string;
'maxNotional': string;
'liquidationPrice': string;
'markPrice': string;
'positionAmount': string;
'symbol': string;
'unrealizedProfit': string;
}
)[];
}

export type SubAccountCOINFuturesPositionRisk = {
'deliveryPositionRiskVos': (
{
'entryPrice': string;
'markPrice': string;
'leverage': string;
'isolated': string;
'isolatedWallet': string;
'isolatedMargin': string;
'isAutoAddMargin': string;
'positionSide': string;
'positionAmount': string;
'symbol': string;
'unrealizedProfit': string;
}
)[];
}

export type RepaymentInfo = {
'loanCoin': string;
'remainingPrincipal': string;
'remainingInterest': string;
'collateralCoin': string;
'remainingCollateral': string;
'currentLTV': string;
'repayStatus': string;
}

export type RepaymentInfo2 = {
'loanCoin': string;
'collateralCoin': string;
'repayStatus': string;
}