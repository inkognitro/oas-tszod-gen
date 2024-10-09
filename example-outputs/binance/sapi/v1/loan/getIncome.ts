import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getIncomeEndpointSchema = {
path: '/sapi/v1/loan/income', 
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

export type GetIncomeRequest = RequestUnion<any,
any,
{
'asset'?: string;
'type'?: 'borrowIn' | 'collateralSpent' | 'repayAmount' | 'collateralReturn' | 'addCollateral' | 'removeCollateral' | 'collateralReturnAfterLiquidation';
'startTime'?: number; // int
'endTime'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetIncomeResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'asset': string;
'type': string;
'amount': string;
'timestamp': number; // int
'tranId': string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetIncomeRequestResult = RequestResult<GetIncomeRequest, GetIncomeResponse>

export function getIncome(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetIncomeRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetIncomeRequestResult> {return requestHandler.execute(createRequest(getIncomeEndpointSchema,
payload), config);}