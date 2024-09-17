import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1EthStakingEthRedeemEndpointSchema = {
path: '/sapi/v1/eth-staking/eth/redeem', 
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

export type PostSapiV1EthStakingEthRedeemPayload = {
'queryParams': {
'asset'?: string;
'amount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1EthStakingEthRedeemResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'success': boolean;
'arrivalTime': number; // int
'ethAmount': string;
'conversionRatio': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1EthStakingEthRedeemRequestResult = RequestResult<Request, PostSapiV1EthStakingEthRedeemResponse>

export function postSapiV1EthStakingEthRedeem(requestHandler: RequestHandler, payload: PostSapiV1EthStakingEthRedeemPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1EthStakingEthRedeemRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1EthStakingEthRedeemEndpointSchema}), config);}