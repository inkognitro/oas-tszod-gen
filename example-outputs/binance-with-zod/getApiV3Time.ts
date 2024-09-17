import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getApiV3TimeEndpointSchema = {
path: '/api/v3/time', 
method: 'get', 
supportedSecuritySchemas: [], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.object({
'serverTime': z.number().int().safe().finite(),
})
}
}
}
}
}

export type GetApiV3TimeResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'serverTime': number; // int
}>>>

export type GetApiV3TimeRequestResult = RequestResult<Request, GetApiV3TimeResponse>

export function getApiV3Time(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<GetApiV3TimeRequestResult> {return requestHandler.execute(createRequest({endpointSchema: getApiV3TimeEndpointSchema}), config);}