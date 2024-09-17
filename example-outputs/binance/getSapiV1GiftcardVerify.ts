import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1GiftcardVerifyEndpointSchema = {
path: '/sapi/v1/giftcard/verify', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
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

export type GetSapiV1GiftcardVerifyPayload = {
'queryParams': {
'referenceNo': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1GiftcardVerifyResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': string;
'message': string;
'data': {
'valid': boolean;
'token': string;
'amount': string;
};
'success': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1GiftcardVerifyRequestResult = RequestResult<Request, GetSapiV1GiftcardVerifyResponse>

export function getSapiV1GiftcardVerify(requestHandler: RequestHandler, payload: GetSapiV1GiftcardVerifyPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1GiftcardVerifyRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1GiftcardVerifyEndpointSchema}), config);}