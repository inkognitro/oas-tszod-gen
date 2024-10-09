import {
  z_Issuing_Card,
  z_Error,
  Issuing_Card,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const getIssuingCardsEndpointSchema = {
  path: '/v1/issuing/cards',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    cardholder: z.string().optional(),
    created: z
      .union([
        z.object({
          gt: z.number().int().safe().finite().optional(),
          gte: z.number().int().safe().finite().optional(),
          lt: z.number().int().safe().finite().optional(),
          lte: z.number().int().safe().finite().optional(),
        }),
        z.number().int().safe().finite(),
      ])
      .optional(),
    ending_before: z.string().optional(),
    exp_month: z.number().int().safe().finite().optional(),
    exp_year: z.number().int().safe().finite().optional(),
    expand: z.array(z.string()).optional(),
    last4: z.string().optional(),
    limit: z.number().int().safe().finite().optional(),
    personalization_design: z.string().optional(),
    starting_after: z.string().optional(),
    status: z.enum(['active', 'canceled', 'inactive']).optional(),
    type: z.enum(['physical', 'virtual']).optional(),
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
          zodSchema: z.object({
            data: z.array(z_Issuing_Card),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/issuing\/cards/),
          }),
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

export type GetIssuingCardsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    cardholder?: string;
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
    ending_before?: string;
    exp_month?: number; // int
    exp_year?: number; // int
    expand?: string[];
    last4?: string;
    limit?: number; // int
    personalization_design?: string;
    starting_after?: string;
    status?: 'active' | 'canceled' | 'inactive';
    type?: 'physical' | 'virtual';
  }
>;

export type GetIssuingCardsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Issuing_Card[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingCardsRequestResult = RequestResult<
  GetIssuingCardsRequest,
  GetIssuingCardsResponse
>;

export function getIssuingCards(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingCardsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingCardsRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingCardsEndpointSchema, payload),
    config
  );
}
