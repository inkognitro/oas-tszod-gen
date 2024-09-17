import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV2EthStakingEthStakeEndpointSchema = {
path: '/sapi/v2/eth-staking/eth/stake', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
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
'wbethAmount': z.string(),
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

export type PostSapiV2EthStakingEthStakePayload = {
'queryParams': {
'amount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV2EthStakingEthStakeResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'success': boolean;
'wbethAmount': string;
'conversionRatio': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV2EthStakingEthStakeRequestResult = RequestResult<Request, PostSapiV2EthStakingEthStakeResponse>

export function postSapiV2EthStakingEthStake(requestHandler: RequestHandler, payload: PostSapiV2EthStakingEthStakePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV2EthStakingEthStakeRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV2EthStakingEthStakeEndpointSchema}), config);}