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

export const getSetupIntentsEndpointSchema = {
  path: '/v1/setup_intents',
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

export type GetSetupIntentsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    attach_to_self?: boolean;
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
    customer?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    payment_method?: string;
    starting_after?: string;
  }
>;

export type GetSetupIntentsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Setup_intent[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSetupIntentsRequestResult = RequestResult<
  GetSetupIntentsRequest,
  GetSetupIntentsResponse
>;

export function getSetupIntents(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSetupIntentsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSetupIntentsRequestResult> {
  return requestHandler.execute(
    createRequest(getSetupIntentsEndpointSchema, payload),
    config
  );
}
