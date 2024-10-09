import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSubscriptionPreviewEndpointSchema = {
path: '/sapi/v1/simple-earn/locked/subscriptionPreview', 
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

export type GetSubscriptionPreviewRequest = RequestUnion<any,
any,
{
'projectId': string;
'amount': number;
'autoSubscribe'?: boolean;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetSubscriptionPreviewResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'rewardAsset': string;
'totalRewardAmt': string;
'extraRewardAsset': string;
'estTotalExtraRewardAmt': string;
'nextPay': string;
'nextPayDate': string;
'valueDate': string;
'rewardsEndDate': string;
'deliverDate': string;
'nextSubscriptionDate': string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetSubscriptionPreviewRequestResult = RequestResult<GetSubscriptionPreviewRequest, GetSubscriptionPreviewResponse>

export function getSubscriptionPreview(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetSubscriptionPreviewRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetSubscriptionPreviewRequestResult> {return requestHandler.execute(createRequest(getSubscriptionPreviewEndpointSchema,
payload), config);}