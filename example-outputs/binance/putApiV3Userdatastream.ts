import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const putApiV3UserdatastreamEndpointSchema = {
path: '/api/v3/userDataStream', 
method: 'put', 
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
}
}
}

export type PutApiV3UserdatastreamPayload = {
'queryParams': {
'listenKey'?: string;
};
}

export type PutApiV3UserdatastreamResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {

}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PutApiV3UserdatastreamRequestResult = RequestResult<Request, PutApiV3UserdatastreamResponse>

export function putApiV3Userdatastream(requestHandler: RequestHandler, payload: PutApiV3UserdatastreamPayload, config?: RequestHandlerExecutionConfig): Promise<PutApiV3UserdatastreamRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: putApiV3UserdatastreamEndpointSchema}), config);}