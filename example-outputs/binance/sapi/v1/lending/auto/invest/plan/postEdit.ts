import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postEditEndpointSchema = {
path: '/sapi/v1/lending/auto-invest/plan/edit', 
method: 'post', 
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

export type PostEditRequest = RequestUnion<any,
any,
{
'planId': number; // int
'subscriptionAmount': number;
'subscriptionCycle': 'H1' | 'H4' | 'H8' | 'H12' | 'WEEKLY' | 'DAILY' | 'MONTHLY' | 'BI_WEEKLY';
'subscriptionStartDay'?: number; // int
'subscriptionStartWeekday'?: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
'subscriptionStartTime': number; // int
'sourceAsset': string;
'flexibleAllowedToUse'?: boolean;
'details'?: (
{
'targetAsset'?: string;
'percentage'?: number; // int
}
)[];
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostEditResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'planId': number; // int
'nextExecutionDateTime': number; // int
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostEditRequestResult = RequestResult<PostEditRequest, PostEditResponse>

export function postEdit(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostEditRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostEditRequestResult> {return requestHandler.execute(createRequest(postEditEndpointSchema,
payload), config);}