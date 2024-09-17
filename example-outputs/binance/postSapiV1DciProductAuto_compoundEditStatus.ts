import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1DciProductAuto_compoundEditStatusEndpointSchema = {
path: '/sapi/v1/dci/product/auto_compound/edit-status', 
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

export type PostSapiV1DciProductAuto_compoundEditStatusPayload = {
'queryParams': {
'positionId': number; // int
'autoCompoundPlan': 'NONE' | 'STANDARD' | 'ADVANCE';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1DciProductAuto_compoundEditStatusResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'positionId': string;
'autoCompoundPlan': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1DciProductAuto_compoundEditStatusRequestResult = RequestResult<Request, PostSapiV1DciProductAuto_compoundEditStatusResponse>

export function postSapiV1DciProductAuto_compoundEditStatus(requestHandler: RequestHandler, payload: PostSapiV1DciProductAuto_compoundEditStatusPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1DciProductAuto_compoundEditStatusRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1DciProductAuto_compoundEditStatusEndpointSchema}), config);}