import {z_Issuing_Cardholder, Issuing_Cardholder} from './issuing';
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

export const getIssuingCardholdersEndpointSchema = {
  path: '/v1/issuing/cardholders',
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
    email: z.string().optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    phone_number: z.string().optional(),
    starting_after: z.string().optional(),
    status: z.enum(['active', 'blocked', 'inactive']).optional(),
    type: z.enum(['company', 'individual']).optional(),
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
            data: z.array(z_Issuing_Cardholder),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/issuing\/cardholders/),
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

export type GetIssuingCardholdersRequest = RequestUnion<
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
    email?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    phone_number?: string;
    starting_after?: string;
    status?: 'active' | 'blocked' | 'inactive';
    type?: 'company' | 'individual';
  }
>;

export type GetIssuingCardholdersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Issuing_Cardholder[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingCardholdersRequestResult = RequestResult<
  GetIssuingCardholdersRequest,
  GetIssuingCardholdersResponse
>;

export function getIssuingCardholders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingCardholdersRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingCardholdersRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingCardholdersEndpointSchema, payload),
    config
  );
}
