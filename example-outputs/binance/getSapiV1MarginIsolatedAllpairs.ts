import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MarginIsolatedAllpairsEndpointSchema = {
path: '/sapi/v1/margin/isolated/allPairs', 
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
},
'401': {
bodyByContentType: {
'application/json': {

}
}
}
}
}

export type GetSapiV1MarginIsolatedAllpairsPayload = {
'queryParams': {
'symbol': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginIsolatedAllpairsResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'symbol': string;
'base': string;
'quote': string;
'isMarginTrade': boolean;
'isBuyAllowed': boolean;
'isSellAllowed': boolean;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginIsolatedAllpairsRequestResult = RequestResult<Request, GetSapiV1MarginIsolatedAllpairsResponse>

export function getSapiV1MarginIsolatedAllpairs(requestHandler: RequestHandler, payload: GetSapiV1MarginIsolatedAllpairsPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginIsolatedAllpairsRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginIsolatedAllpairsEndpointSchema}), config);}