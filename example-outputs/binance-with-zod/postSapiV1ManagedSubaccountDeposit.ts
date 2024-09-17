import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1ManagedSubaccountDepositEndpointSchema = {
path: '/sapi/v1/managed-subaccount/deposit', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'toEmail': z.string(),
'asset': z.string(),
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
'tranId': z.number().int().safe().finite(),
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

export type PostSapiV1ManagedSubaccountDepositPayload = {
'queryParams': {
'toEmail': string;
'asset': string;
'amount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1ManagedSubaccountDepositResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'tranId': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1ManagedSubaccountDepositRequestResult = RequestResult<Request, PostSapiV1ManagedSubaccountDepositResponse>

export function postSapiV1ManagedSubaccountDeposit(requestHandler: RequestHandler, payload: PostSapiV1ManagedSubaccountDepositPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1ManagedSubaccountDepositRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1ManagedSubaccountDepositEndpointSchema}), config);}