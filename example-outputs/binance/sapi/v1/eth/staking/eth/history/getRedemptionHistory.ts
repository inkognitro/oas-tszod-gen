import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getRedemptionHistoryEndpointSchema = {
path: '/sapi/v1/eth-staking/eth/history/redemptionHistory', 
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

export type GetRedemptionHistoryRequest = RequestUnion<any,
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

export type GetRedemptionHistoryResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'rows': (
{
'time': number; // int
'arrivalTime': number; // int
'asset': string;
'amount': string;
'status': string;
'distributeAsset': string;
'distributeAmount': string;
'conversionRatio': string;
}
)[];
'total': number; // int
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetRedemptionHistoryRequestResult = RequestResult<GetRedemptionHistoryRequest, GetRedemptionHistoryResponse>

export function getRedemptionHistory(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetRedemptionHistoryRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetRedemptionHistoryRequestResult> {return requestHandler.execute(createRequest(getRedemptionHistoryEndpointSchema,
payload), config);}