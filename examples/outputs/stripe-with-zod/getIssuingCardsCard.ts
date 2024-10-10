import {z_Issuing_Card, Issuing_Card} from './issuing';
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

export const getIssuingCardsCardEndpointSchema = {
  path: '/v1/issuing/cards/{card}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    card: z.string(),
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
          zodSchema: z_Issuing_Card,
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

export type GetIssuingCardsCardRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    card: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIssuingCardsCardResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Card>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingCardsCardRequestResult = RequestResult<
  GetIssuingCardsCardRequest,
  GetIssuingCardsCardResponse
>;

export function getIssuingCardsCard(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingCardsCardRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingCardsCardRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingCardsCardEndpointSchema, payload),
    config
  );
}
