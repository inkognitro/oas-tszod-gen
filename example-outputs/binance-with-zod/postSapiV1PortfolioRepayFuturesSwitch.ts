import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1PortfolioRepayFuturesSwitchEndpointSchema = {
path: '/sapi/v1/portfolio/repay-futures-switch', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'autoRepay': z.boolean(),
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

export type PostSapiV1PortfolioRepayFuturesSwitchPayload = {
'queryParams': {
'autoRepay': boolean;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1PortfolioRepayFuturesSwitchResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'msg': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1PortfolioRepayFuturesSwitchRequestResult = RequestResult<Request, PostSapiV1PortfolioRepayFuturesSwitchResponse>

export function postSapiV1PortfolioRepayFuturesSwitch(requestHandler: RequestHandler, payload: PostSapiV1PortfolioRepayFuturesSwitchPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1PortfolioRepayFuturesSwitchRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1PortfolioRepayFuturesSwitchEndpointSchema}), config);}