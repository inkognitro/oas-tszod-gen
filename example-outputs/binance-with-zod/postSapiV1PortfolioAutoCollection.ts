import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1PortfolioAutoCollectionEndpointSchema = {
path: '/sapi/v1/portfolio/auto-collection', 
method: 'post', 
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
'msg': z.string(),
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

export type PostSapiV1PortfolioAutoCollectionPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1PortfolioAutoCollectionResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'msg': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1PortfolioAutoCollectionRequestResult = RequestResult<Request, PostSapiV1PortfolioAutoCollectionResponse>

export function postSapiV1PortfolioAutoCollection(requestHandler: RequestHandler, payload: PostSapiV1PortfolioAutoCollectionPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1PortfolioAutoCollectionRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1PortfolioAutoCollectionEndpointSchema}), config);}