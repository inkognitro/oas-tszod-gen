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
import {Topup, Error} from './schemas';

export const postTopupsEndpointSchema = {
  path: '/v1/topups',
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

export type PostTopupsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount: number; // int
      currency: string;
      description?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      source?: string;
      statement_descriptor?: string;
      transfer_group?: string;
    }
  >
>;

export type PostTopupsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Topup>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTopupsRequestResult = RequestResult<
  PostTopupsRequest,
  PostTopupsResponse
>;

export function postTopups(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostTopupsRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostTopupsRequestResult> {
  return requestHandler.execute(
    createRequest(postTopupsEndpointSchema, payload),
    config
  );
}
