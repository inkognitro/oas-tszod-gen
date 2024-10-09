import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getTradeCoeffEndpointSchema = {
path: '/sapi/v1/margin/tradeCoeff', 
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

export type GetTradeCoeffRequest = RequestUnion<any,
any,
{
'email': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetTradeCoeffResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'normalBar'?: string;
'marginCallBar'?: string;
'forceLiquidationBar'?: string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetTradeCoeffRequestResult = RequestResult<GetTradeCoeffRequest, GetTradeCoeffResponse>

export function getTradeCoeff(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetTradeCoeffRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetTradeCoeffRequestResult> {return requestHandler.execute(createRequest(getTradeCoeffEndpointSchema,
payload), config);}