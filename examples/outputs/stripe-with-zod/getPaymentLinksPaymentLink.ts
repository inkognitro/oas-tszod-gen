import {z_Payment_link, z_Error, Payment_link, Error} from './schemas';
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

export const getPaymentLinksPaymentLinkEndpointSchema = {
  path: '/v1/payment_links/{payment_link}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    payment_link: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Payment_link,
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

export type GetPaymentLinksPaymentLinkRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    payment_link: string;
  },
  {
    expand?: string[];
  }
>;

export type GetPaymentLinksPaymentLinkResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_link>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPaymentLinksPaymentLinkRequestResult = RequestResult<
  GetPaymentLinksPaymentLinkRequest,
  GetPaymentLinksPaymentLinkResponse
>;

export function getPaymentLinksPaymentLink(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentLinksPaymentLinkRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentLinksPaymentLinkRequestResult> {
  return requestHandler.execute(
    createRequest(getPaymentLinksPaymentLinkEndpointSchema, payload),
    config
  );
}
