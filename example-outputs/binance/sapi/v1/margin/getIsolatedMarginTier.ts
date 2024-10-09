import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getIsolatedMarginTierEndpointSchema = {
path: '/sapi/v1/margin/isolatedMarginTier', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', scopes: []}], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {

}
}
},
'400': {
bodyByContentType: {
'application/json': {

}
}
},
'401': {
bodyByContentType: {
'application/json': {

}
}
}
}
}

export type GetIsolatedMarginTierRequest = RequestUnion<any,
any,
{
'symbol': string;
'tier'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetIsolatedMarginTierResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'symbol'?: string;
'tier'?: number; // int
'effectiveMultiple'?: string;
'initialRiskRatio'?: string;
'liquidationRiskRatio'?: string;
'baseAssetMaxBorrowable'?: string;
'quoteAssetMaxBorrowable'?: string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetIsolatedMarginTierRequestResult = RequestResult<GetIsolatedMarginTierRequest, GetIsolatedMarginTierResponse>

export function getIsolatedMarginTier(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetIsolatedMarginTierRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetIsolatedMarginTierRequestResult> {return requestHandler.execute(createRequest(getIsolatedMarginTierEndpointSchema,
payload), config);}