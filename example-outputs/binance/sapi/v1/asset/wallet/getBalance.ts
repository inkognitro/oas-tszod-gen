import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getBalanceEndpointSchema = {
path: '/sapi/v1/asset/wallet/balance', 
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

export type GetBalanceRequest = RequestUnion<any,
any,
{
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetBalanceResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'activate': boolean;
'balance': string;
'walletName': string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetBalanceRequestResult = RequestResult<GetBalanceRequest, GetBalanceResponse>

export function getBalance(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetBalanceRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetBalanceRequestResult> {return requestHandler.execute(createRequest(getBalanceEndpointSchema,
payload), config);}