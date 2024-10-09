import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getStakingHistoryEndpointSchema = {
path: '/sapi/v1/eth-staking/eth/history/stakingHistory', 
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
},
'401': {
bodyByContentType: {
'application/json': {

}
}
}
}
}

export type GetStakingHistoryRequest = RequestUnion<any,
any,
{
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetStakingHistoryResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'rows': (
{
'time': number; // int
'asset': string;
'amount': string;
'status': string;
'distributeAmount': string;
'conversionRatio': string;
}
)[];
'total': number; // int
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetStakingHistoryRequestResult = RequestResult<GetStakingHistoryRequest, GetStakingHistoryResponse>

export function getStakingHistory(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetStakingHistoryRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetStakingHistoryRequestResult> {return requestHandler.execute(createRequest(getStakingHistoryEndpointSchema,
payload), config);}