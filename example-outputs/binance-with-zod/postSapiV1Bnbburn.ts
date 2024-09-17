import {bnbBurnStatusZodSchema, errorZodSchema, BnbBurnStatus, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1BnbburnEndpointSchema = {
path: '/sapi/v1/bnbBurn', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'spotBNBBurn': z.union([z.literal('true'),z.literal('false')]).optional(),
'interestBNBBurn': z.union([z.literal('true'),z.literal('false')]).optional(),
'recvWindow': z.number().int().safe().finite().optional(),
'timestamp': z.number().int().safe().finite(),
'signature': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: bnbBurnStatusZodSchema
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

export type PostSapiV1BnbburnPayload = {
'queryParams': {
'spotBNBBurn'?: 'true' | 'false';
'interestBNBBurn'?: 'true' | 'false';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1BnbburnResponse = Response<200, ResponseData<ResponseBodyData<'application/json', BnbBurnStatus>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1BnbburnRequestResult = RequestResult<Request, PostSapiV1BnbburnResponse>

export function postSapiV1Bnbburn(requestHandler: RequestHandler, payload: PostSapiV1BnbburnPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1BnbburnRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1BnbburnEndpointSchema}), config);}