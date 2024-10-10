import {z_Issuing_Authorization, Issuing_Authorization} from './issuing';
import {z_Error, Error} from './schemas';
import {z} from 'zod';
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

export const getIssuingAuthorizationsAuthorizationEndpointSchema = {
  path: '/v1/issuing/authorizations/{authorization}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    authorization: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Issuing_Authorization,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetIssuingAuthorizationsAuthorizationRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    authorization: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIssuingAuthorizationsAuthorizationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Authorization>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingAuthorizationsAuthorizationRequestResult = RequestResult<
  GetIssuingAuthorizationsAuthorizationRequest,
  GetIssuingAuthorizationsAuthorizationResponse
>;

export function getIssuingAuthorizationsAuthorization(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingAuthorizationsAuthorizationRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingAuthorizationsAuthorizationRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingAuthorizationsAuthorizationEndpointSchema, payload),
    config
  );
}
