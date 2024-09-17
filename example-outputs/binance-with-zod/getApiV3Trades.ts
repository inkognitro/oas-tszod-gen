import {tradeZodSchema, errorZodSchema, Trade, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getApiV3TradesEndpointSchema = {
path: '/api/v3/trades', 
method: 'get', 
supportedSecuritySchemas: [], 
queryParamsZodSchema: z.object({
'symbol': z.string(),
'limit': z.number().int().safe().finite().optional(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.array(tradeZodSchema)
}
}
},
'400': {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
}
}
}

export type GetApiV3TradesPayload = {
'queryParams': {
'symbol': string;
'limit'?: number; // int
};
}

export type GetApiV3TradesResponse = Response<200, ResponseData<ResponseBodyData<'application/json', (Trade)[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetApiV3TradesRequestResult = RequestResult<Request, GetApiV3TradesResponse>

export function getApiV3Trades(requestHandler: RequestHandler, payload: GetApiV3TradesPayload, config?: RequestHandlerExecutionConfig): Promise<GetApiV3TradesRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getApiV3TradesEndpointSchema}), config);}