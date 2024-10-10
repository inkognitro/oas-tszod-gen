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
import {Customer_session, Error} from './schemas';

export const postCustomerSessionsEndpointSchema = {
  path: '/v1/customer_sessions',
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

export type PostCustomerSessionsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      components: {
        buy_button?: {
          enabled: boolean;
        };
        payment_element?: {
          enabled: boolean;
          features?: {
            payment_method_allow_redisplay_filters?: (
              | 'always'
              | 'limited'
              | 'unspecified'
            )[];
            payment_method_redisplay?: 'disabled' | 'enabled';
            payment_method_redisplay_limit?: number; // int
            payment_method_remove?: 'disabled' | 'enabled';
            payment_method_save?: 'disabled' | 'enabled';
            payment_method_save_usage?: 'off_session' | 'on_session';
          };
        };
        pricing_table?: {
          enabled: boolean;
        };
      };
      customer: string;
      expand?: string[];
    }
  >
>;

export type PostCustomerSessionsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Customer_session>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomerSessionsRequestResult = RequestResult<
  PostCustomerSessionsRequest,
  PostCustomerSessionsResponse
>;

export function postCustomerSessions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomerSessionsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomerSessionsRequestResult> {
  return requestHandler.execute(
    createRequest(postCustomerSessionsEndpointSchema, payload),
    config
  );
}
