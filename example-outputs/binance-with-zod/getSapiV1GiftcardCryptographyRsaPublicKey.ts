import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1GiftcardCryptographyRsaPublicKeyEndpointSchema = {
path: '/sapi/v1/giftcard/cryptography/rsa-public-key', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'recvWindow': z.number().int().safe().finite().optional(),
'timestamp': z.number().int().safe().finite(),
'signature': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.object({
'code': z.string(),
'message': z.string(),
'data': z.string(),
'success': z.boolean(),
})
}
}
},
'400': {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
},
'401': {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
}
}
}

export type GetSapiV1GiftcardCryptographyRsaPublicKeyPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1GiftcardCryptographyRsaPublicKeyResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': string;
'message': string;
'data': string;
'success': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1GiftcardCryptographyRsaPublicKeyRequestResult = RequestResult<Request, GetSapiV1GiftcardCryptographyRsaPublicKeyResponse>

export function getSapiV1GiftcardCryptographyRsaPublicKey(requestHandler: RequestHandler, payload: GetSapiV1GiftcardCryptographyRsaPublicKeyPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1GiftcardCryptographyRsaPublicKeyRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1GiftcardCryptographyRsaPublicKeyEndpointSchema}), config);}