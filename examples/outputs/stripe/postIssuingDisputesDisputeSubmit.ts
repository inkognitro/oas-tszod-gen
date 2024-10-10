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
import {Issuing_Dispute} from './issuing';
import {Error} from './schemas';

export const postIssuingDisputesDisputeSubmitEndpointSchema = {
  path: '/v1/issuing/disputes/{dispute}/submit',
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

export type PostIssuingDisputesDisputeSubmitRequest = RequestUnion<
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
    dispute: string;
  }
>;

export type PostIssuingDisputesDisputeSubmitResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingDisputesDisputeSubmitRequestResult = RequestResult<
  PostIssuingDisputesDisputeSubmitRequest,
  PostIssuingDisputesDisputeSubmitResponse
>;

export function postIssuingDisputesDisputeSubmit(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingDisputesDisputeSubmitRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingDisputesDisputeSubmitRequestResult> {
  return requestHandler.execute(
    createRequest(postIssuingDisputesDisputeSubmitEndpointSchema, payload),
    config
  );
}
