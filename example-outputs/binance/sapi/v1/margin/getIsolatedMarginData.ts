import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getIsolatedMarginDataEndpointSchema = {
path: '/sapi/v1/margin/isolatedMarginData', 
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

export type GetIsolatedMarginDataRequest = RequestUnion<any,
any,
{
'vipLevel'?: number; // int
'symbol'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetIsolatedMarginDataResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'vipLevel'?: number; // int
'symbol'?: string;
'leverage'?: string;
'data'?: (
{
'coin'?: string;
'dailyInterest'?: string;
'borrowLimit'?: string;
}
)[];
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetIsolatedMarginDataRequestResult = RequestResult<GetIsolatedMarginDataRequest, GetIsolatedMarginDataResponse>

export function getIsolatedMarginData(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetIsolatedMarginDataRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetIsolatedMarginDataRequestResult> {return requestHandler.execute(createRequest(getIsolatedMarginDataEndpointSchema,
payload), config);}