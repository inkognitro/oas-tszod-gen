import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {BnbBurnStatus, Error} from '@example-outputs/binance';

export const getBnbBurnEndpointSchema = {
path: '/sapi/v1/bnbBurn', 
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

export type GetBnbBurnRequest = RequestUnion<any,
any,
{
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetBnbBurnResponse = ResponseUnion<200, ResponseBodyData<'application/json', BnbBurnStatus>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetBnbBurnRequestResult = RequestResult<GetBnbBurnRequest, GetBnbBurnResponse>

export function getBnbBurn(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetBnbBurnRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetBnbBurnRequestResult> {return requestHandler.execute(createRequest(getBnbBurnEndpointSchema,
payload), config);}