import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSubscriptionRecordEndpointSchema = {
path: '/sapi/v1/simple-earn/flexible/history/subscriptionRecord', 
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

export type GetSubscriptionRecordRequest = RequestUnion<any,
any,
{
'productId'?: string;
'purchaseId'?: string;
'asset'?: string;
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetSubscriptionRecordResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'rows': (
{
'amount': string;
'asset': string;
'time': number; // int
'purchaseId': number; // int
'type': string;
'sourceAccount': string;
'amtFromSpot': string;
'amtFromFunding': string;
'status': string;
}
)[];
'total': number; // int
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetSubscriptionRecordRequestResult = RequestResult<GetSubscriptionRecordRequest, GetSubscriptionRecordResponse>

export function getSubscriptionRecord(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetSubscriptionRecordRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetSubscriptionRecordRequestResult> {return requestHandler.execute(createRequest(getSubscriptionRecordEndpointSchema,
payload), config);}