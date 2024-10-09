import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const deleteAccountEndpointSchema = {
path: '/sapi/v1/margin/isolated/account', 
method: 'delete', 
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

export type DeleteAccountRequest = RequestUnion<any,
any,
{
'symbol': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type DeleteAccountResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'success': boolean;
'symbol': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type DeleteAccountRequestResult = RequestResult<DeleteAccountRequest, DeleteAccountResponse>

export function deleteAccount(requestHandler: SimpleRequestHandler, payload: RequestPayload<DeleteAccountRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<DeleteAccountRequestResult> {return requestHandler.execute(createRequest(deleteAccountEndpointSchema,
payload), config);}