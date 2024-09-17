import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1NftUserGetassetEndpointSchema = {
path: '/sapi/v1/nft/user/getAsset', 
method: 'get', 
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

export type GetSapiV1NftUserGetassetPayload = {
'queryParams': {
'limit'?: number; // int
'page'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1NftUserGetassetResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'total': number; // int
'list': ({
'network': string;
'contractAddress': string;
'tokenId': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1NftUserGetassetRequestResult = RequestResult<Request, GetSapiV1NftUserGetassetResponse>

export function getSapiV1NftUserGetasset(requestHandler: RequestHandler, payload: GetSapiV1NftUserGetassetPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1NftUserGetassetRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1NftUserGetassetEndpointSchema}), config);}