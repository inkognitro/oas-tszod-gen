import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV2EthStakingAccountEndpointSchema = {
path: '/sapi/v2/eth-staking/account', 
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

export type GetSapiV2EthStakingAccountPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV2EthStakingAccountResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'holdingInETH': string;
'holdings': {
'wbethAmount': string;
'bethAmount': string;
};
'thirtyDaysProfitInETH': string;
'profit': {
'amountFromWBETH': string;
'amountFromBETH': string;
};
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV2EthStakingAccountRequestResult = RequestResult<Request, GetSapiV2EthStakingAccountResponse>

export function getSapiV2EthStakingAccount(requestHandler: RequestHandler, payload: GetSapiV2EthStakingAccountPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV2EthStakingAccountRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV2EthStakingAccountEndpointSchema}), config);}