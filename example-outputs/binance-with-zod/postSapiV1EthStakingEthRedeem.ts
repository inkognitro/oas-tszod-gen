import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1EthStakingEthRedeemEndpointSchema = {
path: '/sapi/v1/eth-staking/eth/redeem', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'asset': z.string().optional(),
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
'success': z.boolean(),
'arrivalTime': z.number().int().safe().finite(),
'ethAmount': z.string(),
'conversionRatio': z.string(),
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

export type PostSapiV1EthStakingEthRedeemPayload = {
'queryParams': {
'asset'?: string;
'amount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1EthStakingEthRedeemResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'success': boolean;
'arrivalTime': number; // int
'ethAmount': string;
'conversionRatio': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1EthStakingEthRedeemRequestResult = RequestResult<Request, PostSapiV1EthStakingEthRedeemResponse>

export function postSapiV1EthStakingEthRedeem(requestHandler: RequestHandler, payload: PostSapiV1EthStakingEthRedeemPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1EthStakingEthRedeemRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1EthStakingEthRedeemEndpointSchema}), config);}