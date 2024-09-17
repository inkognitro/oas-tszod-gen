import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1AlgoSpotNewordertwapEndpointSchema = {
path: '/sapi/v1/algo/spot/newOrderTwap', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'symbol': z.string(),
'side': z.union([z.literal('SELL'),z.literal('BUY')]),
'quantity': z.number().safe().finite(),
'duration': z.number().int().safe().finite(),
'clientAlgoId': z.string().optional(),
'limitPrice': z.number().safe().finite().optional(),
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
'clientAlgoId': z.string(),
'success': z.boolean(),
'code': z.number().int().safe().finite(),
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

export type PostSapiV1AlgoSpotNewordertwapPayload = {
'queryParams': {
'symbol': string;
'side': 'SELL' | 'BUY';
'quantity': number;
'duration': number; // int
'clientAlgoId'?: string;
'limitPrice'?: number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1AlgoSpotNewordertwapResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'clientAlgoId': string;
'success': boolean;
'code': number; // int
'msg': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1AlgoSpotNewordertwapRequestResult = RequestResult<Request, PostSapiV1AlgoSpotNewordertwapResponse>

export function postSapiV1AlgoSpotNewordertwap(requestHandler: RequestHandler, payload: PostSapiV1AlgoSpotNewordertwapPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1AlgoSpotNewordertwapRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1AlgoSpotNewordertwapEndpointSchema}), config);}