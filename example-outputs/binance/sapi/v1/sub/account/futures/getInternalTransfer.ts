import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getInternalTransferEndpointSchema = {
path: '/sapi/v1/sub-account/futures/internalTransfer', 
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

export type GetInternalTransferRequest = RequestUnion<any,
any,
{
'email': string;
'futuresType': number; // int
'startTime'?: number; // int
'endTime'?: number; // int
'page'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetInternalTransferResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'success': boolean;
'futuresType': number; // int
'transfers': (
{
'from': string;
'to': string;
'asset': string;
'qty': string;
'tranId': number; // int
'time': number; // int
}
)[];
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetInternalTransferRequestResult = RequestResult<GetInternalTransferRequest, GetInternalTransferResponse>

export function getInternalTransfer(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetInternalTransferRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetInternalTransferRequestResult> {return requestHandler.execute(createRequest(getInternalTransferEndpointSchema,
payload), config);}