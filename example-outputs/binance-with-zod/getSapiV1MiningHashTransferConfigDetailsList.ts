import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1MiningHashTransferConfigDetailsListEndpointSchema = {
path: '/sapi/v1/mining/hash-transfer/config/details/list', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'pageIndex': z.number().int().safe().finite().optional(),
'pageSize': z.string().optional(),
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
'code': z.number().int().safe().finite(),
'msg': z.string(),
'data': z.object({
'configDetails': z.array(z.object({
'configId': z.number().int().safe().finite(),
'poolUsername': z.string(),
'toPoolUsername': z.string(),
'algoName': z.string(),
'hashRate': z.number().int().safe().finite(),
'startDay': z.number().int().safe().finite(),
'endDay': z.number().int().safe().finite(),
'status': z.number().int().safe().finite(),
})),
'totalNum': z.number().int().safe().finite(),
'pageSize': z.number().int().safe().finite(),
}),
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

export type GetSapiV1MiningHashTransferConfigDetailsListPayload = {
'queryParams': {
'pageIndex'?: number; // int
'pageSize'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MiningHashTransferConfigDetailsListResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': number; // int
'msg': string;
'data': {
'configDetails': ({
'configId': number; // int
'poolUsername': string;
'toPoolUsername': string;
'algoName': string;
'hashRate': number; // int
'startDay': number; // int
'endDay': number; // int
'status': number; // int
})[];
'totalNum': number; // int
'pageSize': number; // int
};
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MiningHashTransferConfigDetailsListRequestResult = RequestResult<Request, GetSapiV1MiningHashTransferConfigDetailsListResponse>

export function getSapiV1MiningHashTransferConfigDetailsList(requestHandler: RequestHandler, payload: GetSapiV1MiningHashTransferConfigDetailsListPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MiningHashTransferConfigDetailsListRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MiningHashTransferConfigDetailsListEndpointSchema}), config);}