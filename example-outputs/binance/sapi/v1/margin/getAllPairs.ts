import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getAllPairsEndpointSchema = {
path: '/sapi/v1/margin/allPairs', 
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

export type GetAllPairsRequest = RequestUnion<any,
any,
{
'symbol': string;
}>

export type GetAllPairsResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'base': string;
'id': number; // int
'isBuyAllowed': boolean;
'isMarginTrade': boolean;
'isSellAllowed': boolean;
'quote': string;
'symbol': string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>>

export type GetAllPairsRequestResult = RequestResult<GetAllPairsRequest, GetAllPairsResponse>

export function getAllPairs(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetAllPairsRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetAllPairsRequestResult> {return requestHandler.execute(createRequest(getAllPairsEndpointSchema,
payload), config);}