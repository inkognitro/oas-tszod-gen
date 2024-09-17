import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const deleteSapiV1UserdatastreamIsolatedEndpointSchema = {
path: '/sapi/v1/userDataStream/isolated', 
method: 'delete', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'listenKey': z.string().optional(),
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
}
}
}

export type DeleteSapiV1UserdatastreamIsolatedPayload = {
'queryParams': {
'listenKey'?: string;
};
}

export type DeleteSapiV1UserdatastreamIsolatedResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {

}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type DeleteSapiV1UserdatastreamIsolatedRequestResult = RequestResult<Request, DeleteSapiV1UserdatastreamIsolatedResponse>

export function deleteSapiV1UserdatastreamIsolated(requestHandler: RequestHandler, payload: DeleteSapiV1UserdatastreamIsolatedPayload, config?: RequestHandlerExecutionConfig): Promise<DeleteSapiV1UserdatastreamIsolatedRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: deleteSapiV1UserdatastreamIsolatedEndpointSchema}), config);}