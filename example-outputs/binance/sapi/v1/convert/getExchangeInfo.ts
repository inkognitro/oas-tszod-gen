import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getExchangeInfoEndpointSchema = {
path: '/sapi/v1/convert/exchangeInfo', 
method: 'get', 
supportedSecuritySchemas: [], 
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

export type GetExchangeInfoRequest = RequestUnion<any,
any,
{
'fromAsset'?: string;
'toAsset'?: string;
}>

export type GetExchangeInfoResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'fromAsset': string;
'toAsset': string;
'fromAssetMinAmount': string;
'fromAssetMaxAmount': string;
'toAssetMinAmount': string;
'toAssetMaxAmount': string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetExchangeInfoRequestResult = RequestResult<GetExchangeInfoRequest, GetExchangeInfoResponse>

export function getExchangeInfo(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetExchangeInfoRequest, never, 'queryParams'>, config?: RequestHandlerExecutionConfig): Promise<GetExchangeInfoRequestResult> {return requestHandler.execute(createRequest(getExchangeInfoEndpointSchema,
payload), config);}