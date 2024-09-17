import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1MarginCrossmargincollateralratioEndpointSchema = {
path: '/sapi/v1/margin/crossMarginCollateralRatio', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.array(z.object({
'collaterals': z.array(z.object({
'minUsdValue': z.string(),
'maxUsdValue': z.string(),
'discountRate': z.string(),
})),
'assetNames': z.array(z.string()),
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
}
}
}

export type GetSapiV1MarginCrossmargincollateralratioResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'collaterals': ({
'minUsdValue': string;
'maxUsdValue': string;
'discountRate': string;
})[];
'assetNames': (string)[];
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginCrossmargincollateralratioRequestResult = RequestResult<Request, GetSapiV1MarginCrossmargincollateralratioResponse>

export function getSapiV1MarginCrossmargincollateralratio(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginCrossmargincollateralratioRequestResult> {return requestHandler.execute(createRequest({endpointSchema: getSapiV1MarginCrossmargincollateralratioEndpointSchema}), config);}