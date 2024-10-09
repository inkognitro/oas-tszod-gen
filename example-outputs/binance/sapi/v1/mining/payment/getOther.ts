import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getOtherEndpointSchema = {
path: '/sapi/v1/mining/payment/other', 
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

export type GetOtherRequest = RequestUnion<any,
any,
{
'algo': string;
'userName': string;
'coin'?: string;
'startDate'?: string;
'endDate'?: string;
'pageIndex'?: number; // int
'pageSize'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetOtherResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'code': number; // int
'msg': string;
'data': {
'otherProfits': (
{
'time': number; // int
'coinName': string;
'type': number; // int
'profitAmount': number;
'status': number; // int
}
)[];
'totalNum': number; // int
'pageSize': number; // int
};
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetOtherRequestResult = RequestResult<GetOtherRequest, GetOtherResponse>

export function getOther(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetOtherRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetOtherRequestResult> {return requestHandler.execute(createRequest(getOtherEndpointSchema,
payload), config);}