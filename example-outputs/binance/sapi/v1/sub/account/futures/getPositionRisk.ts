import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getPositionRiskEndpointSchema = {
path: '/sapi/v1/sub-account/futures/positionRisk', 
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

export type GetPositionRiskRequest = RequestUnion<any,
any,
{
'email': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetPositionRiskResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'entryPrice': string;
'leverage': string;
'maxNotional': string;
'liquidationPrice': string;
'markPrice': string;
'positionAmount': string;
'symbol': string;
'unrealizedProfit': string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetPositionRiskRequestResult = RequestResult<GetPositionRiskRequest, GetPositionRiskResponse>

export function getPositionRisk(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetPositionRiskRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetPositionRiskRequestResult> {return requestHandler.execute(createRequest(getPositionRiskEndpointSchema,
payload), config);}