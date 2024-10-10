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
import {Transfer_reversal, Error} from './schemas';

export const postTransfersIdReversalsEndpointSchema = {
  path: '/v1/transfers/{id}/reversals',
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

export type PostTransfersIdReversalsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      description?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      refund_application_fee?: boolean;
    }
  >,
  {
    id: string;
  }
>;

export type PostTransfersIdReversalsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Transfer_reversal>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTransfersIdReversalsRequestResult = RequestResult<
  PostTransfersIdReversalsRequest,
  PostTransfersIdReversalsResponse
>;

export function postTransfersIdReversals(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTransfersIdReversalsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTransfersIdReversalsRequestResult> {
  return requestHandler.execute(
    createRequest(postTransfersIdReversalsEndpointSchema, payload),
    config
  );
}
