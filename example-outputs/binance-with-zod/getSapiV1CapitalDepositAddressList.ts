import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1CapitalDepositAddressListEndpointSchema = {
path: '/sapi/v1/capital/deposit/address/list', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'coin': z.string(),
'network': z.string().optional(),
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
'coin': z.string(),
'address': z.string(),
'isDefault': z.number().int().safe().finite(),
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

export type GetSapiV1CapitalDepositAddressListPayload = {
'queryParams': {
'coin': string;
'network'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1CapitalDepositAddressListResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'coin': string;
'address': string;
'isDefault': number; // int
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1CapitalDepositAddressListRequestResult = RequestResult<Request, GetSapiV1CapitalDepositAddressListResponse>

export function getSapiV1CapitalDepositAddressList(requestHandler: RequestHandler, payload: GetSapiV1CapitalDepositAddressListPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1CapitalDepositAddressListRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1CapitalDepositAddressListEndpointSchema}), config);}