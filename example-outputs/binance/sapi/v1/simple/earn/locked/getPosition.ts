import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getPositionEndpointSchema = {
path: '/sapi/v1/simple-earn/locked/position', 
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

export type GetPositionRequest = RequestUnion<any,
any,
{
'asset'?: string;
'positionId'?: string;
'projectId'?: string;
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetPositionResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'rows': (
{
'positionId': string;
'projectId': string;
'asset': string;
'amount': string;
'purchaseTime': string;
'duration': string;
'accrualDays': string;
'rewardAsset': string;
'APY': string;
'isRenewable': boolean;
'isAutoRenew': boolean;
'redeemDate': string;
}
)[];
'total': number; // int
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetPositionRequestResult = RequestResult<GetPositionRequest, GetPositionResponse>

export function getPosition(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetPositionRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetPositionRequestResult> {return requestHandler.execute(createRequest(getPositionEndpointSchema,
payload), config);}