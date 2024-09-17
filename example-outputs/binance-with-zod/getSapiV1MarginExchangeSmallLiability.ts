import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1MarginExchangeSmallLiabilityEndpointSchema = {
path: '/sapi/v1/margin/exchange-small-liability', 
method: 'get', 
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
zodSchema: z.array(z.object({
'asset': z.string(),
'interest': z.string(),
'principal': z.string(),
'liabilityAsset': z.string(),
'liabilityQty': z.number().safe().finite(),
}))
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

export type GetSapiV1MarginExchangeSmallLiabilityPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginExchangeSmallLiabilityResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'asset': string;
'interest': string;
'principal': string;
'liabilityAsset': string;
'liabilityQty': number;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginExchangeSmallLiabilityRequestResult = RequestResult<Request, GetSapiV1MarginExchangeSmallLiabilityResponse>

export function getSapiV1MarginExchangeSmallLiability(requestHandler: RequestHandler, payload: GetSapiV1MarginExchangeSmallLiabilityPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginExchangeSmallLiabilityRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginExchangeSmallLiabilityEndpointSchema}), config);}