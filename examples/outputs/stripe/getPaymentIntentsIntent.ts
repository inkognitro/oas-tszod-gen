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
import {Payment_intent, Error} from './schemas';

export const getPaymentIntentsIntentEndpointSchema = {
  path: '/v1/payment_intents/{intent}',
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

export type GetPaymentIntentsIntentRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    intent: string;
  },
  {
    client_secret?: string;
    expand?: string[];
  }
>;

export type GetPaymentIntentsIntentResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPaymentIntentsIntentRequestResult = RequestResult<
  GetPaymentIntentsIntentRequest,
  GetPaymentIntentsIntentResponse
>;

export function getPaymentIntentsIntent(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentIntentsIntentRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentIntentsIntentRequestResult> {
  return requestHandler.execute(
    createRequest(getPaymentIntentsIntentEndpointSchema, payload),
    config
  );
}
