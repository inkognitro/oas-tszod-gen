import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1LendingAutoInvestPlanEditEndpointSchema = {
path: '/sapi/v1/lending/auto-invest/plan/edit', 
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

export type PostSapiV1LendingAutoInvestPlanEditPayload = {
'queryParams': {
'planId': number; // int
'subscriptionAmount': number;
'subscriptionCycle': 'H1' | 'H4' | 'H8' | 'H12' | 'WEEKLY' | 'DAILY' | 'MONTHLY' | 'BI_WEEKLY';
'subscriptionStartDay'?: number; // int
'subscriptionStartWeekday'?: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
'subscriptionStartTime': number; // int
'sourceAsset': string;
'flexibleAllowedToUse'?: boolean;
'details'?: ({
'targetAsset'?: string;
'percentage'?: number; // int
})[];
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1LendingAutoInvestPlanEditResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'planId': number; // int
'nextExecutionDateTime': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1LendingAutoInvestPlanEditRequestResult = RequestResult<Request, PostSapiV1LendingAutoInvestPlanEditResponse>

export function postSapiV1LendingAutoInvestPlanEdit(requestHandler: RequestHandler, payload: PostSapiV1LendingAutoInvestPlanEditPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1LendingAutoInvestPlanEditRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1LendingAutoInvestPlanEditEndpointSchema}), config);}