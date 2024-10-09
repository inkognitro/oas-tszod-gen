import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postTransferEndpointSchema = {
path: '/sapi/v1/asset/convert-transfer', 
method: 'post', 
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

export type PostTransferRequest = RequestUnion<any,
any,
{
'clientTranId': string;
'asset': string;
'amount': number;
'targetAsset': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostTransferResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'tranId': number; // int
'status': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostTransferRequestResult = RequestResult<PostTransferRequest, PostTransferResponse>

export function postTransfer(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostTransferRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostTransferRequestResult> {return requestHandler.execute(createRequest(postTransferEndpointSchema,
payload), config);}