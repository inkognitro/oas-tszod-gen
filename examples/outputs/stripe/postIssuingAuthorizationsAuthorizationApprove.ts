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

export const postIssuingAuthorizationsAuthorizationApproveEndpointSchema = {
  path: '/v1/issuing/authorizations/{authorization}/approve',
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

export type PostIssuingAuthorizationsAuthorizationApproveRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    authorization: string;
  }
>;

export type PostIssuingAuthorizationsAuthorizationApproveResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Authorization>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingAuthorizationsAuthorizationApproveRequestResult =
  RequestResult<
    PostIssuingAuthorizationsAuthorizationApproveRequest,
    PostIssuingAuthorizationsAuthorizationApproveResponse
  >;

export function postIssuingAuthorizationsAuthorizationApprove(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingAuthorizationsAuthorizationApproveRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingAuthorizationsAuthorizationApproveRequestResult> {
  return requestHandler.execute(
    createRequest(
      postIssuingAuthorizationsAuthorizationApproveEndpointSchema,
      payload
    ),
    config
  );
}
