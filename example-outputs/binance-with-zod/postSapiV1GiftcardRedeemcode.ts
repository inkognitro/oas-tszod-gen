import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1GiftcardRedeemcodeEndpointSchema = {
path: '/sapi/v1/giftcard/redeemCode', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'code': z.string(),
'externalUid': z.string().optional(),
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
'token': z.string(),
'amount': z.string(),
'referenceNo': z.string(),
'identityNo': z.string(),
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

export type PostSapiV1GiftcardRedeemcodePayload = {
'queryParams': {
'code': string;
'externalUid'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1GiftcardRedeemcodeResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': string;
'message': string;
'data': {
'token': string;
'amount': string;
'referenceNo': string;
'identityNo': string;
};
'success': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1GiftcardRedeemcodeRequestResult = RequestResult<Request, PostSapiV1GiftcardRedeemcodeResponse>

export function postSapiV1GiftcardRedeemcode(requestHandler: RequestHandler, payload: PostSapiV1GiftcardRedeemcodePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1GiftcardRedeemcodeRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1GiftcardRedeemcodeEndpointSchema}), config);}