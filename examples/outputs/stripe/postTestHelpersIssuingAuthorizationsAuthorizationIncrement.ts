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
import {Issuing_Authorization} from './issuing';
import {Error} from './schemas';

export const postTestHelpersIssuingAuthorizationsAuthorizationIncrementEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/increment',
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

export type PostTestHelpersIssuingAuthorizationsAuthorizationIncrementRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
        increment_amount: number; // int
        is_amount_controllable?: boolean;
      }
    >,
    {
      authorization: string;
    }
  >;

export type PostTestHelpersIssuingAuthorizationsAuthorizationIncrementResponse =

    | ResponseUnion<
        200,
        ResponseBodyData<'application/json', Issuing_Authorization>
      >
    | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingAuthorizationsAuthorizationIncrementRequestResult =
  RequestResult<
    PostTestHelpersIssuingAuthorizationsAuthorizationIncrementRequest,
    PostTestHelpersIssuingAuthorizationsAuthorizationIncrementResponse
  >;

export function postTestHelpersIssuingAuthorizationsAuthorizationIncrement(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingAuthorizationsAuthorizationIncrementRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingAuthorizationsAuthorizationIncrementRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingAuthorizationsAuthorizationIncrementEndpointSchema,
      payload
    ),
    config
  );
}
