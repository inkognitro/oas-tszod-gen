import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1MarginTradecoeffEndpointSchema = {
path: '/sapi/v1/margin/tradeCoeff', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'email': z.string(),
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
'normalBar': z.string().optional(),
'marginCallBar': z.string().optional(),
'forceLiquidationBar': z.string().optional(),
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

export type GetSapiV1MarginTradecoeffPayload = {
'queryParams': {
'email': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginTradecoeffResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'normalBar'?: string;
'marginCallBar'?: string;
'forceLiquidationBar'?: string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginTradecoeffRequestResult = RequestResult<Request, GetSapiV1MarginTradecoeffResponse>

export function getSapiV1MarginTradecoeff(requestHandler: RequestHandler, payload: GetSapiV1MarginTradecoeffPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginTradecoeffRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginTradecoeffEndpointSchema}), config);}