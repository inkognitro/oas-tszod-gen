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
import {Setup_intent, Error} from './schemas';

export const getSetupIntentsIntentEndpointSchema = {
  path: '/v1/setup_intents/{intent}',
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

export type GetSetupIntentsIntentRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    intent: string;
  },
  {
    client_secret?: string;
    expand?: string[];
  }
>;

export type GetSetupIntentsIntentResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Setup_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSetupIntentsIntentRequestResult = RequestResult<
  GetSetupIntentsIntentRequest,
  GetSetupIntentsIntentResponse
>;

export function getSetupIntentsIntent(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSetupIntentsIntentRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSetupIntentsIntentRequestResult> {
  return requestHandler.execute(
    createRequest(getSetupIntentsIntentEndpointSchema, payload),
    config
  );
}
