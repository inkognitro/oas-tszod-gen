import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MarginAllpairsEndpointSchema = {
path: '/sapi/v1/margin/allPairs', 
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

export type GetSapiV1MarginAllpairsPayload = {
'queryParams': {
'symbol': string;
};
}

export type GetSapiV1MarginAllpairsResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'base': string;
'id': number; // int
'isBuyAllowed': boolean;
'isMarginTrade': boolean;
'isSellAllowed': boolean;
'quote': string;
'symbol': string;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginAllpairsRequestResult = RequestResult<Request, GetSapiV1MarginAllpairsResponse>

export function getSapiV1MarginAllpairs(requestHandler: RequestHandler, payload: GetSapiV1MarginAllpairsPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginAllpairsRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginAllpairsEndpointSchema}), config);}