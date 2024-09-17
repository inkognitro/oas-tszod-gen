import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1LendingAutoInvestRedeemEndpointSchema = {
path: '/sapi/v1/lending/auto-invest/redeem', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'indexId': z.number().int().safe().finite(),
'requestId': z.string().optional(),
'redemptionPercentage': z.number().int().safe().finite(),
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
'redemptionId': z.number().int().safe().finite(),
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

export type PostSapiV1LendingAutoInvestRedeemPayload = {
'queryParams': {
'indexId': number; // int
'requestId'?: string;
'redemptionPercentage': number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1LendingAutoInvestRedeemResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'redemptionId': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1LendingAutoInvestRedeemRequestResult = RequestResult<Request, PostSapiV1LendingAutoInvestRedeemResponse>

export function postSapiV1LendingAutoInvestRedeem(requestHandler: RequestHandler, payload: PostSapiV1LendingAutoInvestRedeemPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1LendingAutoInvestRedeemRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1LendingAutoInvestRedeemEndpointSchema}), config);}