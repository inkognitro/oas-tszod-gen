import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getDataEndpointSchema = {
path: '/sapi/v1/loan/vip/request/data', 
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

export type GetDataRequest = RequestUnion<any,
any,
{
'current'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetDataResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'total': number; // int
'rows': (
{
'loanAccountId': string;
'orderId': string;
'requestId': string;
'loanCoin': string;
'loanAmount': string;
'collateralAccountId': string;
'collateralCoin': string;
'loanTerm': number; // int
'status': number; // int
}
)[];
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetDataRequestResult = RequestResult<GetDataRequest, GetDataResponse>

export function getData(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetDataRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetDataRequestResult> {return requestHandler.execute(createRequest(getDataEndpointSchema,
payload), config);}