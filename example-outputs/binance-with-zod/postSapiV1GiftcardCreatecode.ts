import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1GiftcardCreatecodeEndpointSchema = {
path: '/sapi/v1/giftcard/createCode', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'token': z.string(),
'amount': z.number().safe().finite(),
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
'data': z.object({
'referenceNo': z.string(),
'code': z.string(),
'expiredTime': z.number().int().safe().finite(),
}),
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

export type PostSapiV1GiftcardCreatecodePayload = {
'queryParams': {
'token': string;
'amount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1GiftcardCreatecodeResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': string;
'message': string;
'data': {
'referenceNo': string;
'code': string;
'expiredTime': number; // int
};
'success': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1GiftcardCreatecodeRequestResult = RequestResult<Request, PostSapiV1GiftcardCreatecodeResponse>

export function postSapiV1GiftcardCreatecode(requestHandler: RequestHandler, payload: PostSapiV1GiftcardCreatecodePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1GiftcardCreatecodeRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1GiftcardCreatecodeEndpointSchema}), config);}