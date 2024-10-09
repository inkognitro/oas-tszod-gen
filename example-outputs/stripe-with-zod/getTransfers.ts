import {
  z_Transfer,
  z_Error,
  Transfer,
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

export const getTransfersEndpointSchema = {
  path: '/v1/transfers',
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
    destination: z.string().optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
    transfer_group: z.string().optional(),
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
            data: z.array(z_Transfer),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/transfers/),
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

export type GetTransfersRequest = RequestUnion<
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
    destination?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    transfer_group?: string;
  }
>;

export type GetTransfersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Transfer[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTransfersRequestResult = RequestResult<
  GetTransfersRequest,
  GetTransfersResponse
>;

export function getTransfers(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTransfersRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTransfersRequestResult> {
  return requestHandler.execute(
    createRequest(getTransfersEndpointSchema, payload),
    config
  );
}
