import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1PortfolioCollateralrateEndpointSchema = {
path: '/sapi/v1/portfolio/collateralRate', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.array(z.object({
'asset': z.string(),
'collateralRate': z.string(),
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

export type GetSapiV1PortfolioCollateralrateResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'asset': string;
'collateralRate': string;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1PortfolioCollateralrateRequestResult = RequestResult<Request, GetSapiV1PortfolioCollateralrateResponse>

export function getSapiV1PortfolioCollateralrate(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1PortfolioCollateralrateRequestResult> {return requestHandler.execute(createRequest({endpointSchema: getSapiV1PortfolioCollateralrateEndpointSchema}), config);}