import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getQueryByPageEndpointSchema = {
path: '/sapi/v1/asset/convert-transfer/queryByPage', 
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

export type GetQueryByPageRequest = RequestUnion<any,
any,
{
'tranId'?: number; // int
'asset'?: string;
'startTime': number; // int
'endTime': number; // int
'accountType'?: 'MAIN' | 'CARD';
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetQueryByPageResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'total': number; // int
'rows': (
{
'tranId': number; // int
'type': number; // int
'time': number; // int
'deductedAsset': string;
'deductedAmount': string;
'targetAsset': string;
'targetAmount': string;
'status': string;
'accountType': string;
}
)[];
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetQueryByPageRequestResult = RequestResult<GetQueryByPageRequest, GetQueryByPageResponse>

export function getQueryByPage(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetQueryByPageRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetQueryByPageRequestResult> {return requestHandler.execute(createRequest(getQueryByPageEndpointSchema,
payload), config);}