import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe/core';
import {Capability, Error} from '@example-outputs/stripe';

export const getAccountsAccountCapabilitiesCapabilityEndpointSchema = {
  path: '/v1/accounts/{account}/capabilities/{capability}',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetAccountsAccountCapabilitiesCapabilityRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
    capability: string;
  },
  {
    expand?: string[];
  }
>;

export type GetAccountsAccountCapabilitiesCapabilityResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Capability>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountCapabilitiesCapabilityRequestResult =
  RequestResult<
    GetAccountsAccountCapabilitiesCapabilityRequest,
    GetAccountsAccountCapabilitiesCapabilityResponse
  >;

export function getAccountsAccountCapabilitiesCapability(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountCapabilitiesCapabilityRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountCapabilitiesCapabilityRequestResult> {
  return requestHandler.execute(
    createRequest(
      getAccountsAccountCapabilitiesCapabilityEndpointSchema,
      payload
    ),
    config
  );
}
