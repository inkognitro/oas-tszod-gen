import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getInfoEndpointSchema = {
path: '/sapi/v1/account/info', 
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

export type GetInfoRequest = RequestUnion<any,
any,
{
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetInfoResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'vipLevel': number; // int
'isMarginEnabled': boolean;
'isFutureEnabled': boolean;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetInfoRequestResult = RequestResult<GetInfoRequest, GetInfoResponse>

export function getInfo(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetInfoRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetInfoRequestResult> {return requestHandler.execute(createRequest(getInfoEndpointSchema,
payload), config);}