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
} from './core';
import {Capability, Error} from './schemas';

export const postAccountsAccountCapabilitiesCapabilityEndpointSchema = {
  path: '/v1/accounts/{account}/capabilities/{capability}',
  method: 'post',
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

export type PostAccountsAccountCapabilitiesCapabilityRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      requested?: boolean;
    }
  >,
  {
    account: string;
    capability: string;
  }
>;

export type PostAccountsAccountCapabilitiesCapabilityResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Capability>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountsAccountCapabilitiesCapabilityRequestResult =
  RequestResult<
    PostAccountsAccountCapabilitiesCapabilityRequest,
    PostAccountsAccountCapabilitiesCapabilityResponse
  >;

export function postAccountsAccountCapabilitiesCapability(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAccountsAccountCapabilitiesCapabilityRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountsAccountCapabilitiesCapabilityRequestResult> {
  return requestHandler.execute(
    createRequest(
      postAccountsAccountCapabilitiesCapabilityEndpointSchema,
      payload
    ),
    config
  );
}
