import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getLiabilityEndpointSchema = {
path: '/sapi/v1/margin/exchange-small-liability', 
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

export type GetLiabilityRequest = RequestUnion<any,
any,
{
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetLiabilityResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'asset': string;
'interest': string;
'principal': string;
'liabilityAsset': string;
'liabilityQty': number;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetLiabilityRequestResult = RequestResult<GetLiabilityRequest, GetLiabilityResponse>

export function getLiability(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetLiabilityRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetLiabilityRequestResult> {return requestHandler.execute(createRequest(getLiabilityEndpointSchema,
payload), config);}