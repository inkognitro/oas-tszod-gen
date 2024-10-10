import {z_Radar_Early_fraud_warning, Radar_Early_fraud_warning} from './radar';
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

export const getRadarEarlyFraudWarningsEndpointSchema = {
  path: '/v1/radar/early_fraud_warnings',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    charge: z.string().optional(),
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
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    payment_intent: z.string().optional(),
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
            data: z.array(z_Radar_Early_fraud_warning),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/radar\/early_fraud_warnings/),
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

export type GetRadarEarlyFraudWarningsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    charge?: string;
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
    expand?: string[];
    limit?: number; // int
    payment_intent?: string;
    starting_after?: string;
  }
>;

export type GetRadarEarlyFraudWarningsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Radar_Early_fraud_warning[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetRadarEarlyFraudWarningsRequestResult = RequestResult<
  GetRadarEarlyFraudWarningsRequest,
  GetRadarEarlyFraudWarningsResponse
>;

export function getRadarEarlyFraudWarnings(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetRadarEarlyFraudWarningsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetRadarEarlyFraudWarningsRequestResult> {
  return requestHandler.execute(
    createRequest(getRadarEarlyFraudWarningsEndpointSchema, payload),
    config
  );
}
