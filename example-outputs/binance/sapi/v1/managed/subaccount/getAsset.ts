import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getAssetEndpointSchema = {
path: '/sapi/v1/managed-subaccount/asset', 
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

export type GetAssetRequest = RequestUnion<any,
any,
{
'email': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetAssetResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'coin': string;
'name': string;
'totalBalance': string;
'availableBalance': string;
'inOrder': string;
'btcValue': string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetAssetRequestResult = RequestResult<GetAssetRequest, GetAssetResponse>

export function getAsset(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetAssetRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetAssetRequestResult> {return requestHandler.execute(createRequest(getAssetEndpointSchema,
payload), config);}