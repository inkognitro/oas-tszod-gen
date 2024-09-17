import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getApiV3MyallocationsEndpointSchema = {
path: '/api/v3/myAllocations', 
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

export type GetApiV3MyallocationsPayload = {
'queryParams': {
'symbol': string;
'startTime'?: number; // int
'endTime'?: number; // int
'fromAllocationId'?: number; // int
'limit'?: number; // int
'orderId'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetApiV3MyallocationsResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'symbol': string;
'allocationId': number; // int
'allocationType': string;
'orderId': number; // int
'orderListId': number; // int
'price': string;
'qty': string;
'quoteQty': string;
'commission': string;
'commissionAsset': string;
'time': number; // int
'isBuyer': boolean;
'isMaker': boolean;
'isAllocator': boolean;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetApiV3MyallocationsRequestResult = RequestResult<Request, GetApiV3MyallocationsResponse>

export function getApiV3Myallocations(requestHandler: RequestHandler, payload: GetApiV3MyallocationsPayload, config?: RequestHandlerExecutionConfig): Promise<GetApiV3MyallocationsRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getApiV3MyallocationsEndpointSchema}), config);}