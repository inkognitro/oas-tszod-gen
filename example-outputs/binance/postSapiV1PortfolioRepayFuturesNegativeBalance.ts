import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1PortfolioRepayFuturesNegativeBalanceEndpointSchema = {
path: '/sapi/v1/portfolio/repay-futures-negative-balance', 
method: 'post', 
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

export type PostSapiV1PortfolioRepayFuturesNegativeBalancePayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1PortfolioRepayFuturesNegativeBalanceResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'msg': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1PortfolioRepayFuturesNegativeBalanceRequestResult = RequestResult<Request, PostSapiV1PortfolioRepayFuturesNegativeBalanceResponse>

export function postSapiV1PortfolioRepayFuturesNegativeBalance(requestHandler: RequestHandler, payload: PostSapiV1PortfolioRepayFuturesNegativeBalancePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1PortfolioRepayFuturesNegativeBalanceRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1PortfolioRepayFuturesNegativeBalanceEndpointSchema}), config);}