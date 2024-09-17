import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1PortfolioInterestHistoryEndpointSchema = {
path: '/sapi/v1/portfolio/interest-history', 
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

export type GetSapiV1PortfolioInterestHistoryPayload = {
'queryParams': {
'asset': string;
'startTime'?: number; // int
'endTime'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1PortfolioInterestHistoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'asset': string;
'interest': string;
'interestAccruedTime': number; // int
'interestRate': string;
'principal': string;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1PortfolioInterestHistoryRequestResult = RequestResult<Request, GetSapiV1PortfolioInterestHistoryResponse>

export function getSapiV1PortfolioInterestHistory(requestHandler: RequestHandler, payload: GetSapiV1PortfolioInterestHistoryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1PortfolioInterestHistoryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1PortfolioInterestHistoryEndpointSchema}), config);}