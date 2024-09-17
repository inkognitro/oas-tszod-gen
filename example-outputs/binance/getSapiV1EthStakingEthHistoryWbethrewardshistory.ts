import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1EthStakingEthHistoryWbethrewardshistoryEndpointSchema = {
path: '/sapi/v1/eth-staking/eth/history/wbethRewardsHistory', 
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

export type GetSapiV1EthStakingEthHistoryWbethrewardshistoryPayload = {
'queryParams': {
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1EthStakingEthHistoryWbethrewardshistoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'estRewardsInETH': string;
'rows': ({
'time': number; // int
'amountInETH': string;
'holding': string;
'holdingInETH': string;
'annualPercentageRate': string;
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1EthStakingEthHistoryWbethrewardshistoryRequestResult = RequestResult<Request, GetSapiV1EthStakingEthHistoryWbethrewardshistoryResponse>

export function getSapiV1EthStakingEthHistoryWbethrewardshistory(requestHandler: RequestHandler, payload: GetSapiV1EthStakingEthHistoryWbethrewardshistoryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1EthStakingEthHistoryWbethrewardshistoryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1EthStakingEthHistoryWbethrewardshistoryEndpointSchema}), config);}