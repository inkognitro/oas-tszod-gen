import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1ConvertLimitPlaceorderEndpointSchema = {
path: '/sapi/v1/convert/limit/placeOrder', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'baseAsset': z.string(),
'quoteAsset': z.string(),
'limitPrice': z.number().safe().finite(),
'baseAmount': z.number().safe().finite().optional(),
'quoteAmount': z.number().safe().finite().optional(),
'side': z.union([z.literal('SELL'),z.literal('BUY')]),
'walletType': z.union([z.literal('SPOT'),z.literal('FUNDING'),z.literal('SPOT_FUNDING')]).optional(),
'expiredType': z.union([z.literal('1_D'),z.literal('3_D'),z.literal('7_D'),z.literal('30_D')]).optional(),
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
'orderId': z.number().int().safe().finite(),
'status': z.string(),
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

export type PostSapiV1ConvertLimitPlaceorderPayload = {
'queryParams': {
'baseAsset': string;
'quoteAsset': string;
'limitPrice': number;
'baseAmount'?: number;
'quoteAmount'?: number;
'side': 'SELL' | 'BUY';
'walletType'?: 'SPOT' | 'FUNDING' | 'SPOT_FUNDING';
'expiredType'?: '1_D' | '3_D' | '7_D' | '30_D';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1ConvertLimitPlaceorderResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'orderId': number; // int
'status': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1ConvertLimitPlaceorderRequestResult = RequestResult<Request, PostSapiV1ConvertLimitPlaceorderResponse>

export function postSapiV1ConvertLimitPlaceorder(requestHandler: RequestHandler, payload: PostSapiV1ConvertLimitPlaceorderPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1ConvertLimitPlaceorderRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1ConvertLimitPlaceorderEndpointSchema}), config);}