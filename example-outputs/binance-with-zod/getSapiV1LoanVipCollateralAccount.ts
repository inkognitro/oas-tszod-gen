import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1LoanVipCollateralAccountEndpointSchema = {
path: '/sapi/v1/loan/vip/collateral/account', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'orderId': z.number().int().safe().finite().optional(),
'collateralAccountId': z.number().int().safe().finite().optional(),
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
'rows': z.array(z.object({
'collateralAccountId': z.string(),
'collateralCoin': z.string(),
'collateralValue': z.string(),
})),
'total': z.number().int().safe().finite(),
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

export type GetSapiV1LoanVipCollateralAccountPayload = {
'queryParams': {
'orderId'?: number; // int
'collateralAccountId'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1LoanVipCollateralAccountResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'collateralAccountId': string;
'collateralCoin': string;
'collateralValue': string;
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LoanVipCollateralAccountRequestResult = RequestResult<Request, GetSapiV1LoanVipCollateralAccountResponse>

export function getSapiV1LoanVipCollateralAccount(requestHandler: RequestHandler, payload: GetSapiV1LoanVipCollateralAccountPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LoanVipCollateralAccountRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LoanVipCollateralAccountEndpointSchema}), config);}