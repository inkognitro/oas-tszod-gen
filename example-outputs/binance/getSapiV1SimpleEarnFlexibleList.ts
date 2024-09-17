import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1SimpleEarnFlexibleListEndpointSchema = {
path: '/sapi/v1/simple-earn/flexible/list', 
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

export type GetSapiV1SimpleEarnFlexibleListPayload = {
'queryParams': {
'asset'?: string;
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SimpleEarnFlexibleListResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'asset': string;
'latestAnnualPercentageRate': string;
'tierAnnualPercentageRate': {
'0-5BTC': number;
'5-10BTC': number;
};
'airDropPercentageRate': string;
'canPurchase': boolean;
'canRedeem': boolean;
'isSoldOut': boolean;
'hot': boolean;
'minPurchaseAmount': string;
'productId': string;
'subscriptionStartTime': string;
'status': string;
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SimpleEarnFlexibleListRequestResult = RequestResult<Request, GetSapiV1SimpleEarnFlexibleListResponse>

export function getSapiV1SimpleEarnFlexibleList(requestHandler: RequestHandler, payload: GetSapiV1SimpleEarnFlexibleListPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SimpleEarnFlexibleListRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SimpleEarnFlexibleListEndpointSchema}), config);}