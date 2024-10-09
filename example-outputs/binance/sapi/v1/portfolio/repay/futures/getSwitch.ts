import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSwitchEndpointSchema = {
path: '/sapi/v1/portfolio/repay-futures-switch', 
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

export type GetSwitchRequest = RequestUnion<any,
any,
{
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetSwitchResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'autoRepay': boolean;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetSwitchRequestResult = RequestResult<GetSwitchRequest, GetSwitchResponse>

export function getSwitch(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetSwitchRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetSwitchRequestResult> {return requestHandler.execute(createRequest(getSwitchEndpointSchema,
payload), config);}