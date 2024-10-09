import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getCommissionEndpointSchema = {
path: '/api/v3/account/commission', 
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

export type GetCommissionRequest = RequestUnion<any,
any,
{
'symbol': string;
'timestamp': number; // int
'signature': string;
}>

export type GetCommissionResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'symbol': string;
'standardCommission': {
'maker': string;
'taker': string;
'buyer': string;
'seller': string;
};
'taxCommission': {
'maker': string;
'taker': string;
'buyer': string;
'seller': string;
};
'discount': {
'enabledForAccount'?: boolean;
'enabledForSymbol'?: boolean;
'discountAsset'?: string;
'discount'?: string;
};
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetCommissionRequestResult = RequestResult<GetCommissionRequest, GetCommissionResponse>

export function getCommission(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetCommissionRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetCommissionRequestResult> {return requestHandler.execute(createRequest(getCommissionEndpointSchema,
payload), config);}