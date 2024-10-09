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
import {Identity_Verification_session, Error} from '@example-outputs/stripe';

export const getIdentityVerificationSessionsEndpointSchema = {
  path: '/v1/identity/verification_sessions',
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

export type GetIdentityVerificationSessionsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    client_reference_id?: string;
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    related_customer?: string;
    starting_after?: string;
    status?: 'canceled' | 'processing' | 'requires_input' | 'verified';
  }
>;

export type GetIdentityVerificationSessionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Identity_Verification_session[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIdentityVerificationSessionsRequestResult = RequestResult<
  GetIdentityVerificationSessionsRequest,
  GetIdentityVerificationSessionsResponse
>;

export function getIdentityVerificationSessions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIdentityVerificationSessionsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIdentityVerificationSessionsRequestResult> {
  return requestHandler.execute(
    createRequest(getIdentityVerificationSessionsEndpointSchema, payload),
    config
  );
}
