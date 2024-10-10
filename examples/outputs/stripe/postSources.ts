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
import {Source, Error} from './schemas';

export const postSourcesEndpointSchema = {
  path: '/v1/sources',
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

export type PostSourcesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      currency?: string;
      customer?: string;
      expand?: string[];
      flow?: 'code_verification' | 'none' | 'receiver' | 'redirect';
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
      metadata?: {
        [key: string]: string;
      };
      original_source?: string;
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
      receiver?: {
        refund_attributes_method?: 'email' | 'manual' | 'none';
      };
      redirect?: {
        return_url: string;
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
      statement_descriptor?: string;
      token?: string;
      type?: string;
      usage?: 'reusable' | 'single_use';
    }
  >
>;

export type PostSourcesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Source>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSourcesRequestResult = RequestResult<
  PostSourcesRequest,
  PostSourcesResponse
>;

export function postSources(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSourcesRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSourcesRequestResult> {
  return requestHandler.execute(
    createRequest(postSourcesEndpointSchema, payload),
    config
  );
}
