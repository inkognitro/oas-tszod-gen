import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1SimpleEarnFlexibleHistoryCollateralrecordEndpointSchema = {
path: '/sapi/v1/simple-earn/flexible/history/collateralRecord', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'productId': z.string().optional(),
'startTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
'current': z.number().int().safe().finite().optional(),
'size': z.number().int().safe().finite().optional(),
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
'amount': z.string(),
'productId': z.string(),
'asset': z.string(),
'createTime': z.number().int().safe().finite(),
'type': z.string(),
'productName': z.string(),
'orderId': z.number().int().safe().finite(),
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

export type GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordPayload = {
'queryParams': {
'productId'?: string;
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'amount': string;
'productId': string;
'asset': string;
'createTime': number; // int
'type': string;
'productName': string;
'orderId': number; // int
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequestResult = RequestResult<Request, GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordResponse>

export function getSapiV1SimpleEarnFlexibleHistoryCollateralrecord(requestHandler: RequestHandler, payload: GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SimpleEarnFlexibleHistoryCollateralrecordEndpointSchema}), config);}