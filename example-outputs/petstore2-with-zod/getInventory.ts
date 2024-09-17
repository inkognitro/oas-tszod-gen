import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/petstore2-with-zod/core';

export const getInventoryEndpointSchema = {
path: '/store/inventory', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'api_key', requiredPermissions: []}], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.record(z.number().int().safe().finite())
}
}
}
}
}

export type GetInventoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
[key: string]: number; // int
}>>>

export type GetInventoryRequestResult = RequestResult<Request, GetInventoryResponse>

export function getInventory(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<GetInventoryRequestResult> {return requestHandler.execute(createRequest({endpointSchema: getInventoryEndpointSchema}), config);}