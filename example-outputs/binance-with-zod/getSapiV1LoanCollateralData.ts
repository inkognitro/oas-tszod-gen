import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1LoanCollateralDataEndpointSchema = {
path: '/sapi/v1/loan/collateral/data', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'collateralCoin': z.string().optional(),
'vipLevel': z.number().int().safe().finite().optional(),
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
'collateralCoin': z.string(),
'initialLTV': z.string(),
'marginCallLTV': z.string(),
'liquidationLTV': z.string(),
'maxLimit': z.string(),
'vipLevel': z.number().int().safe().finite(),
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

export type GetSapiV1LoanCollateralDataPayload = {
'queryParams': {
'collateralCoin'?: string;
'vipLevel'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1LoanCollateralDataResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'collateralCoin': string;
'initialLTV': string;
'marginCallLTV': string;
'liquidationLTV': string;
'maxLimit': string;
'vipLevel': number; // int
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LoanCollateralDataRequestResult = RequestResult<Request, GetSapiV1LoanCollateralDataResponse>

export function getSapiV1LoanCollateralData(requestHandler: RequestHandler, payload: GetSapiV1LoanCollateralDataPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LoanCollateralDataRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LoanCollateralDataEndpointSchema}), config);}