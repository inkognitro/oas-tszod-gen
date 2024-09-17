import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1CapitalDepositHisrecEndpointSchema = {
path: '/sapi/v1/capital/deposit/hisrec', 
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

export type GetSapiV1CapitalDepositHisrecPayload = {
'queryParams': {
'coin'?: string;
'status'?: number; // int
'startTime'?: number; // int
'endTime'?: number; // int
'offset'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1CapitalDepositHisrecResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'amount': string;
'coin': string;
'network': string;
'status': number; // int
'address': string;
'addressTag': string;
'txId': string;
'insertTime': number; // int
'transferType': number; // int
'unlockConfirm': string;
'confirmTimes': string;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1CapitalDepositHisrecRequestResult = RequestResult<Request, GetSapiV1CapitalDepositHisrecResponse>

export function getSapiV1CapitalDepositHisrec(requestHandler: RequestHandler, payload: GetSapiV1CapitalDepositHisrecPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1CapitalDepositHisrecRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1CapitalDepositHisrecEndpointSchema}), config);}