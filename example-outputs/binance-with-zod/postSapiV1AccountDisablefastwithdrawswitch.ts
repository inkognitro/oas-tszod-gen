import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1AccountDisablefastwithdrawswitchEndpointSchema = {
path: '/sapi/v1/account/disableFastWithdrawSwitch', 
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

export type PostSapiV1AccountDisablefastwithdrawswitchPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1AccountDisablefastwithdrawswitchResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {

}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1AccountDisablefastwithdrawswitchRequestResult = RequestResult<Request, PostSapiV1AccountDisablefastwithdrawswitchResponse>

export function postSapiV1AccountDisablefastwithdrawswitch(requestHandler: RequestHandler, payload: PostSapiV1AccountDisablefastwithdrawswitchPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1AccountDisablefastwithdrawswitchRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1AccountDisablefastwithdrawswitchEndpointSchema}), config);}