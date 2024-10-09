import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getRedemptionRecordEndpointSchema = {
path: '/sapi/v1/simple-earn/flexible/history/redemptionRecord', 
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

export type GetRedemptionRecordRequest = RequestUnion<any,
any,
{
'productId'?: string;
'redeemId'?: string;
'asset'?: string;
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'size'?: number; // int
}>

export type GetRedemptionRecordResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'rows': (
{
'amount': string;
'asset': string;
'time': number; // int
'projectId': string;
'redeemId': number; // int
'destAccount': string;
'status': string;
}
)[];
'total': number; // int
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetRedemptionRecordRequestResult = RequestResult<GetRedemptionRecordRequest, GetRedemptionRecordResponse>

export function getRedemptionRecord(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetRedemptionRecordRequest, never, 'queryParams'>, config?: RequestHandlerExecutionConfig): Promise<GetRedemptionRecordRequestResult> {return requestHandler.execute(createRequest(getRedemptionRecordEndpointSchema,
payload), config);}