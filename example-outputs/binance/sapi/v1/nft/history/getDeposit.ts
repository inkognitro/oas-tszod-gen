import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getDepositEndpointSchema = {
path: '/sapi/v1/nft/history/deposit', 
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

export type GetDepositRequest = RequestUnion<any,
any,
{
'startTime'?: number; // int
'endTime'?: number; // int
'limit'?: number; // int
'page'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetDepositResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'total': number; // int
'list': (
{
'network': string;
'txID': null | number; // int
'contractAdrress': string;
'tokenId': string;
'timestamp': number; // int
}
)[];
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetDepositRequestResult = RequestResult<GetDepositRequest, GetDepositResponse>

export function getDeposit(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetDepositRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetDepositRequestResult> {return requestHandler.execute(createRequest(getDepositEndpointSchema,
payload), config);}