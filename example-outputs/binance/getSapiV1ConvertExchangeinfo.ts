import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1ConvertExchangeinfoEndpointSchema = {
path: '/sapi/v1/convert/exchangeInfo', 
method: 'get', 
supportedSecuritySchemas: [], 
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
},
'401': {
bodyByContentType: {
'application/json': {

}
}
}
}
}

export type GetSapiV1ConvertExchangeinfoPayload = {
'queryParams': {
'fromAsset'?: string;
'toAsset'?: string;
};
}

export type GetSapiV1ConvertExchangeinfoResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'fromAsset': string;
'toAsset': string;
'fromAssetMinAmount': string;
'fromAssetMaxAmount': string;
'toAssetMinAmount': string;
'toAssetMaxAmount': string;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1ConvertExchangeinfoRequestResult = RequestResult<Request, GetSapiV1ConvertExchangeinfoResponse>

export function getSapiV1ConvertExchangeinfo(requestHandler: RequestHandler, payload: GetSapiV1ConvertExchangeinfoPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1ConvertExchangeinfoRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1ConvertExchangeinfoEndpointSchema}), config);}