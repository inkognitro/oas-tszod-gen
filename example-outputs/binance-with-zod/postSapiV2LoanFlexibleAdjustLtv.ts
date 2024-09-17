import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV2LoanFlexibleAdjustLtvEndpointSchema = {
path: '/sapi/v2/loan/flexible/adjust/ltv', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'loanCoin': z.string().optional(),
'collateralCoin': z.string().optional(),
'adjustmentAmount': z.number().safe().finite(),
'direction': z.union([z.literal('ADDITIONAL'),z.literal('REDUCED')]),
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
'loanCoin': z.string(),
'collateralCoin': z.string(),
'direction': z.string(),
'adjustmentAmount': z.string(),
'currentLTV': z.string(),
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

export type PostSapiV2LoanFlexibleAdjustLtvPayload = {
'queryParams': {
'loanCoin'?: string;
'collateralCoin'?: string;
'adjustmentAmount': number;
'direction': 'ADDITIONAL' | 'REDUCED';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV2LoanFlexibleAdjustLtvResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'loanCoin': string;
'collateralCoin': string;
'direction': string;
'adjustmentAmount': string;
'currentLTV': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV2LoanFlexibleAdjustLtvRequestResult = RequestResult<Request, PostSapiV2LoanFlexibleAdjustLtvResponse>

export function postSapiV2LoanFlexibleAdjustLtv(requestHandler: RequestHandler, payload: PostSapiV2LoanFlexibleAdjustLtvPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV2LoanFlexibleAdjustLtvRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV2LoanFlexibleAdjustLtvEndpointSchema}), config);}