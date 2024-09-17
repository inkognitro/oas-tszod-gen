import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1AssetTradefeeEndpointSchema = {
path: '/sapi/v1/asset/tradeFee', 
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

export type GetSapiV1AssetTradefeePayload = {
'queryParams': {
'symbol'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1AssetTradefeeResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'symbol': string;
'makerCommission': string;
'takerCommission': string;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1AssetTradefeeRequestResult = RequestResult<Request, GetSapiV1AssetTradefeeResponse>

export function getSapiV1AssetTradefee(requestHandler: RequestHandler, payload: GetSapiV1AssetTradefeePayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1AssetTradefeeRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1AssetTradefeeEndpointSchema}), config);}