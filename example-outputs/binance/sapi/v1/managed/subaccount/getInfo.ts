import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getInfoEndpointSchema = {
path: '/sapi/v1/managed-subaccount/info', 
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
'email': string;
'page'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetInfoResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'total': number; // int
'managerSubUserInfoVoList': (
{
'rootUserId': number; // int
'managersubUserId': number; // int
'bindParentUserId': number; // int
'email'?: string;
'insertTimeStamp': number; // int
'bindParentEmail': string;
'isSubUserEnabled': boolean;
'isUserActive': boolean;
'isMarginEnabled': boolean;
'isFutureEnabled': boolean;
'isSignedLVTRiskAgreement': boolean;
}
)[];
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetInfoRequestResult = RequestResult<GetInfoRequest, GetInfoResponse>

export function getInfo(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetInfoRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetInfoRequestResult> {return requestHandler.execute(createRequest(getInfoEndpointSchema,
payload), config);}