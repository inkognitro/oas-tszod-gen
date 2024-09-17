import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1FiatPaymentsEndpointSchema = {
path: '/sapi/v1/fiat/payments', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'transactionType': z.number().int().safe().finite().lte(1),
'beginTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
'page': z.number().int().safe().finite().optional(),
'rows': z.number().int().safe().finite().optional(),
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
'code': z.string(),
'message': z.string(),
'data': z.array(z.object({
'orderNo': z.string(),
'sourceAmount': z.string(),
'fiatCurrency': z.string(),
'obtainAmount': z.string(),
'cryptoCurrency': z.string(),
'totalFee': z.string(),
'price': z.string(),
'status': z.string(),
'createTime': z.number().int().safe().finite(),
'updateTime': z.number().int().safe().finite(),
})),
'total': z.number().int().safe().finite(),
'success': z.boolean(),
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

export type GetSapiV1FiatPaymentsPayload = {
'queryParams': {
'transactionType': number; // int
'beginTime'?: number; // int
'endTime'?: number; // int
'page'?: number; // int
'rows'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1FiatPaymentsResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': string;
'message': string;
'data': ({
'orderNo': string;
'sourceAmount': string;
'fiatCurrency': string;
'obtainAmount': string;
'cryptoCurrency': string;
'totalFee': string;
'price': string;
'status': string;
'createTime': number; // int
'updateTime': number; // int
})[];
'total': number; // int
'success': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1FiatPaymentsRequestResult = RequestResult<Request, GetSapiV1FiatPaymentsResponse>

export function getSapiV1FiatPayments(requestHandler: RequestHandler, payload: GetSapiV1FiatPaymentsPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1FiatPaymentsRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1FiatPaymentsEndpointSchema}), config);}