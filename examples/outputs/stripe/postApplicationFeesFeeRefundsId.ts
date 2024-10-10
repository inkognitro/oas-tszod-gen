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
import {Fee_refund, Error} from './schemas';

export const postApplicationFeesFeeRefundsIdEndpointSchema = {
  path: '/v1/application_fees/{fee}/refunds/{id}',
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

export type PostApplicationFeesFeeRefundsIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    fee: string;
    id: string;
  }
>;

export type PostApplicationFeesFeeRefundsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Fee_refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostApplicationFeesFeeRefundsIdRequestResult = RequestResult<
  PostApplicationFeesFeeRefundsIdRequest,
  PostApplicationFeesFeeRefundsIdResponse
>;

export function postApplicationFeesFeeRefundsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostApplicationFeesFeeRefundsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostApplicationFeesFeeRefundsIdRequestResult> {
  return requestHandler.execute(
    createRequest(postApplicationFeesFeeRefundsIdEndpointSchema, payload),
    config
  );
}
