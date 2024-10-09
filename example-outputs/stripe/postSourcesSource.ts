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
} from '@example-outputs/stripe/core';
import {Source, Error} from '@example-outputs/stripe';

export const postSourcesSourceEndpointSchema = {
  path: '/v1/sources/{source}',
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

export type PostSourcesSourceRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      expand?: string[];
      mandate?: {
        acceptance?: {
          date?: number; // int
          ip?: string;
          offline?: {
            contact_email: string;
          };
          online?: {
            date?: number; // int
            ip?: string;
            user_agent?: string;
          };
          status: 'accepted' | 'pending' | 'refused' | 'revoked';
          type?: 'offline' | 'online';
          user_agent?: string;
        };
        amount?: number | '';
        currency?: string;
        interval?: 'one_time' | 'scheduled' | 'variable';
        notification_method?:
          | 'deprecated_none'
          | 'email'
          | 'manual'
          | 'none'
          | 'stripe_email';
      };
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      owner?: {
        address?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
        email?: string;
        name?: string;
        phone?: string;
      };
      source_order?: {
        items?: {
          amount?: number; // int
          currency?: string;
          description?: string;
          parent?: string;
          quantity?: number; // int
          type?: 'discount' | 'shipping' | 'sku' | 'tax';
        }[];
        shipping?: {
          address: {
            city?: string;
            country?: string;
            line1: string;
            line2?: string;
            postal_code?: string;
            state?: string;
          };
          carrier?: string;
          name?: string;
          phone?: string;
          tracking_number?: string;
        };
      };
    }
  >,
  {
    source: string;
  }
>;

export type PostSourcesSourceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Source>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSourcesSourceRequestResult = RequestResult<
  PostSourcesSourceRequest,
  PostSourcesSourceResponse
>;

export function postSourcesSource(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSourcesSourceRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSourcesSourceRequestResult> {
  return requestHandler.execute(
    createRequest(postSourcesSourceEndpointSchema, payload),
    config
  );
}
