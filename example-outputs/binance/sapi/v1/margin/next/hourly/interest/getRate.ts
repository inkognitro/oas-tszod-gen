import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getRateEndpointSchema = {
path: '/sapi/v1/margin/next-hourly-interest-rate', 
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

export type GetRateRequest = RequestUnion<any,
any,
{
'assets'?: string;
'isIsolated'?: 'TRUE' | 'FALSE';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetRateResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'asset': string;
'nextHourlyInterestRate': string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetRateRequestResult = RequestResult<GetRateRequest, GetRateResponse>

export function getRate(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetRateRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetRateRequestResult> {return requestHandler.execute(createRequest(getRateEndpointSchema,
payload), config);}