import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1MiningPubAlgolistEndpointSchema = {
path: '/sapi/v1/mining/pub/algoList', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.object({
'code': z.number().int().safe().finite(),
'msg': z.string(),
'data': z.array(z.object({
'algoName': z.string(),
'algoId': z.number().int().safe().finite(),
'poolIndex': z.number().int().safe().finite(),
'unit': z.string(),
})),
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
}
}
}

export type GetSapiV1MiningPubAlgolistResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': number; // int
'msg': string;
'data': ({
'algoName': string;
'algoId': number; // int
'poolIndex': number; // int
'unit': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MiningPubAlgolistRequestResult = RequestResult<Request, GetSapiV1MiningPubAlgolistResponse>

export function getSapiV1MiningPubAlgolist(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MiningPubAlgolistRequestResult> {return requestHandler.execute(createRequest({endpointSchema: getSapiV1MiningPubAlgolistEndpointSchema}), config);}