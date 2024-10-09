import {
  z_Credit_note,
  z_Error,
  Credit_note,
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

export const getCreditNotesEndpointSchema = {
  path: '/v1/credit_notes',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
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
    customer: z.string().optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    invoice: z.string().optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
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
            data: z.array(z_Credit_note),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
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

export type GetCreditNotesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
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
    invoice?: string;
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetCreditNotesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Credit_note[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCreditNotesRequestResult = RequestResult<
  GetCreditNotesRequest,
  GetCreditNotesResponse
>;

export function getCreditNotes(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCreditNotesRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCreditNotesRequestResult> {
  return requestHandler.execute(
    createRequest(getCreditNotesEndpointSchema, payload),
    config
  );
}
