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
import {Issuing_Authorization, Error} from '@example-outputs/stripe';

export const getIssuingAuthorizationsEndpointSchema = {
  path: '/v1/issuing/authorizations',
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

export type GetIssuingAuthorizationsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    card?: string;
    cardholder?: string;
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
    starting_after?: string;
    status?: 'closed' | 'pending' | 'reversed';
  }
>;

export type GetIssuingAuthorizationsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Issuing_Authorization[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingAuthorizationsRequestResult = RequestResult<
  GetIssuingAuthorizationsRequest,
  GetIssuingAuthorizationsResponse
>;

export function getIssuingAuthorizations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingAuthorizationsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingAuthorizationsRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingAuthorizationsEndpointSchema, payload),
    config
  );
}
