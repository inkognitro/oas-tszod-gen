import {Request, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getCollateralRateEndpointSchema = {
path: '/sapi/v1/portfolio/collateralRate', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', scopes: []}], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {

}
}
},
'400': {
bodyByContentType: {
'application/json': {

}
}
}
}
}

export type GetCollateralRateRequest = Request

export type GetCollateralRateResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'asset': string;
'collateralRate': string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>>

export type GetCollateralRateRequestResult = RequestResult<GetCollateralRateRequest, GetCollateralRateResponse>

export function getCollateralRate(requestHandler: SimpleRequestHandler, config?: RequestHandlerExecutionConfig): Promise<GetCollateralRateRequestResult> {return requestHandler.execute(createRequest(getCollateralRateEndpointSchema), config);}