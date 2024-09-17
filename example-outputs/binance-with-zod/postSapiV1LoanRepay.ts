import {repaymentInfoZodSchema, repaymentInfo2ZodSchema, errorZodSchema, RepaymentInfo, RepaymentInfo2, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1LoanRepayEndpointSchema = {
path: '/sapi/v1/loan/repay', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'orderId': z.number().int().safe().finite(),
'amount': z.number().safe().finite(),
'type': z.number().int().safe().finite().optional(),
'collateralReturn': z.boolean().optional(),
'recvWindow': z.number().int().safe().finite().optional(),
'timestamp': z.number().int().safe().finite(),
'signature': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.union([repaymentInfoZodSchema,repaymentInfo2ZodSchema])
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

export type PostSapiV1LoanRepayPayload = {
'queryParams': {
'orderId': number; // int
'amount': number;
'type'?: number; // int
'collateralReturn'?: boolean;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1LoanRepayResponse = Response<200, ResponseData<ResponseBodyData<'application/json', RepaymentInfo
|RepaymentInfo2>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1LoanRepayRequestResult = RequestResult<Request, PostSapiV1LoanRepayResponse>

export function postSapiV1LoanRepay(requestHandler: RequestHandler, payload: PostSapiV1LoanRepayPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1LoanRepayRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1LoanRepayEndpointSchema}), config);}