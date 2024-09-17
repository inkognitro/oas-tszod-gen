import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1LoanVipCollateralDataEndpointSchema = {
path: '/sapi/v1/loan/vip/collateral/data', 
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

export type GetSapiV1LoanVipCollateralDataPayload = {
'queryParams': {
'collateralCoin'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1LoanVipCollateralDataResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'collateralCoin': string;
'_1stCollateralRatio': string;
'_1stCollateralRange': string;
'_2ndCollateralRatio': string;
'_2ndCollateralRange': string;
'_3rdCollateralRatio': string;
'_3rdCollateralRange': string;
'_4thCollateralRatio': string;
'_4thCollateralRange': string;
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LoanVipCollateralDataRequestResult = RequestResult<Request, GetSapiV1LoanVipCollateralDataResponse>

export function getSapiV1LoanVipCollateralData(requestHandler: RequestHandler, payload: GetSapiV1LoanVipCollateralDataPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LoanVipCollateralDataRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LoanVipCollateralDataEndpointSchema}), config);}