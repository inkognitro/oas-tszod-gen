import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1CapitalWithdrawAddressListEndpointSchema = {
path: '/sapi/v1/capital/withdraw/address/list', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.array(z.object({
'address': z.string(),
'addressTag': z.string(),
'coin': z.string(),
'name': z.string(),
'network': z.string(),
'origin': z.string(),
'originType': z.string(),
'whiteStatus': z.boolean(),
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

export type GetSapiV1CapitalWithdrawAddressListResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'address': string;
'addressTag': string;
'coin': string;
'name': string;
'network': string;
'origin': string;
'originType': string;
'whiteStatus': boolean;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1CapitalWithdrawAddressListRequestResult = RequestResult<Request, GetSapiV1CapitalWithdrawAddressListResponse>

export function getSapiV1CapitalWithdrawAddressList(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1CapitalWithdrawAddressListRequestResult> {return requestHandler.execute(createRequest({endpointSchema: getSapiV1CapitalWithdrawAddressListEndpointSchema}), config);}