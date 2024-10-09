import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getGetAssetEndpointSchema = {
path: '/sapi/v1/nft/user/getAsset', 
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

export type GetGetAssetRequest = RequestUnion<any,
any,
{
'limit'?: number; // int
'page'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetGetAssetResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'total': number; // int
'list': (
{
'network': string;
'contractAddress': string;
'tokenId': string;
}
)[];
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetGetAssetRequestResult = RequestResult<GetGetAssetRequest, GetGetAssetResponse>

export function getGetAsset(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetGetAssetRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetGetAssetRequestResult> {return requestHandler.execute(createRequest(getGetAssetEndpointSchema,
payload), config);}