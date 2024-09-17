import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1LendingAutoInvestPlanEditStatusEndpointSchema = {
path: '/sapi/v1/lending/auto-invest/plan/edit-status', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'planId': z.number().int().safe().finite(),
'status': z.union([z.literal('ONGOING'),z.literal('PAUSED'),z.literal('REMOVED')]),
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
'planId': z.number().int().safe().finite(),
'nextExecutionDateTime': z.number().int().safe().finite(),
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

export type PostSapiV1LendingAutoInvestPlanEditStatusPayload = {
'queryParams': {
'planId': number; // int
'status': 'ONGOING' | 'PAUSED' | 'REMOVED';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1LendingAutoInvestPlanEditStatusResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'planId': number; // int
'nextExecutionDateTime': number; // int
'status': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1LendingAutoInvestPlanEditStatusRequestResult = RequestResult<Request, PostSapiV1LendingAutoInvestPlanEditStatusResponse>

export function postSapiV1LendingAutoInvestPlanEditStatus(requestHandler: RequestHandler, payload: PostSapiV1LendingAutoInvestPlanEditStatusPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1LendingAutoInvestPlanEditStatusRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1LendingAutoInvestPlanEditStatusEndpointSchema}), config);}