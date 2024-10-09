import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getTradeFeeEndpointSchema = {
path: '/sapi/v1/asset/tradeFee', 
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

export type GetTradeFeeRequest = RequestUnion<any,
any,
{
'symbol'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetTradeFeeResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'symbol': string;
'makerCommission': string;
'takerCommission': string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetTradeFeeRequestResult = RequestResult<GetTradeFeeRequest, GetTradeFeeResponse>

export function getTradeFee(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetTradeFeeRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetTradeFeeRequestResult> {return requestHandler.execute(createRequest(getTradeFeeEndpointSchema,
payload), config);}