import {z_Forwarding_Request, Forwarding_Request} from './forwarding';
import {z_Error, Error} from './schemas';
import {z} from 'zod';
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

export const postForwardingRequestsEndpointSchema = {
  path: '/v1/forwarding/requests',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        payment_method: z.string(),
        replacements: z.array(
          z.enum(['card_cvc', 'card_expiry', 'card_number', 'cardholder_name'])
        ),
        request: z
          .object({
            body: z.string().optional(),
            headers: z
              .array(
                z.object({
                  name: z.string(),
                  value: z.string(),
                })
              )
              .optional(),
          })
          .optional(),
        url: z.string(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Forwarding_Request,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PostForwardingRequestsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      payment_method: string;
      replacements: (
        | 'card_cvc'
        | 'card_expiry'
        | 'card_number'
        | 'cardholder_name'
      )[];
      request?: {
        body?: string;
        headers?: {
          name: string;
          value: string;
        }[];
      };
      url: string;
    }
  >
>;

export type PostForwardingRequestsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Forwarding_Request>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostForwardingRequestsRequestResult = RequestResult<
  PostForwardingRequestsRequest,
  PostForwardingRequestsResponse
>;

export function postForwardingRequests(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostForwardingRequestsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostForwardingRequestsRequestResult> {
  return requestHandler.execute(
    createRequest(postForwardingRequestsEndpointSchema, payload),
    config
  );
}
