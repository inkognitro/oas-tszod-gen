import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSubAddressEndpointSchema = {
path: '/sapi/v1/capital/deposit/subAddress', 
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

export type GetSubAddressRequest = RequestUnion<any,
any,
{
'email': string;
'coin': string;
'network'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetSubAddressResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'address': string;
'coin': string;
'tag': string;
'url': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetSubAddressRequestResult = RequestResult<GetSubAddressRequest, GetSubAddressResponse>

export function getSubAddress(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetSubAddressRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetSubAddressRequestResult> {return requestHandler.execute(createRequest(getSubAddressEndpointSchema,
payload), config);}