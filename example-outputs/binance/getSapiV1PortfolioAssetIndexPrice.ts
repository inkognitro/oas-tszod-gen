import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1PortfolioAssetIndexPriceEndpointSchema = {
path: '/sapi/v1/portfolio/asset-index-price', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
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

export type GetSapiV1PortfolioAssetIndexPricePayload = {
'queryParams': {
'asset'?: string;
};
}

export type GetSapiV1PortfolioAssetIndexPriceResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'asset': string;
'assetIndexPrice': string;
'time': number; // int
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1PortfolioAssetIndexPriceRequestResult = RequestResult<Request, GetSapiV1PortfolioAssetIndexPriceResponse>

export function getSapiV1PortfolioAssetIndexPrice(requestHandler: RequestHandler, payload: GetSapiV1PortfolioAssetIndexPricePayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1PortfolioAssetIndexPriceRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1PortfolioAssetIndexPriceEndpointSchema}), config);}