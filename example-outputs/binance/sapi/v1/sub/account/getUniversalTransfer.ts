import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getUniversalTransferEndpointSchema = {
path: '/sapi/v1/sub-account/universalTransfer', 
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

export type GetUniversalTransferRequest = RequestUnion<any,
any,
{
'fromEmail'?: string;
'toEmail'?: string;
'clientTranId'?: string;
'startTime'?: number; // int
'endTime'?: number; // int
'page'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetUniversalTransferResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'tranId': number; // int
'fromEmail': string;
'toEmail': string;
'asset': string;
'amount': string;
'fromAccountType': string;
'toAccountType': string;
'status': string;
'createTimeStamp': number; // int
'clientTranId': string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetUniversalTransferRequestResult = RequestResult<GetUniversalTransferRequest, GetUniversalTransferResponse>

export function getUniversalTransfer(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetUniversalTransferRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetUniversalTransferRequestResult> {return requestHandler.execute(createRequest(getUniversalTransferEndpointSchema,
payload), config);}