import {z_Error, Error} from '../../../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';

export const postLiquidationEndpointSchema = {
  path: '/sapi/v1/margin/manual-liquidation',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    type: z.enum(['MARGIN', 'ISOLATED']),
    symbol: z.string().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              asset: z.string(),
              interest: z.string(),
              principal: z.string(),
              liabilityAsset: z.string(),
              liabilityQty: z.number().safe().finite(),
            })
          ),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PostLiquidationRequest = RequestUnion<
  any,
  any,
  {
    type: 'MARGIN' | 'ISOLATED';
    symbol?: string;
    timestamp: number; // int
    signature: string;
  }
>;

export type PostLiquidationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          interest: string;
          principal: string;
          liabilityAsset: string;
          liabilityQty: number;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostLiquidationRequestResult = RequestResult<
  PostLiquidationRequest,
  PostLiquidationResponse
>;

export function postLiquidation(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostLiquidationRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostLiquidationRequestResult> {
  return requestHandler.execute(
    createRequest(postLiquidationEndpointSchema, payload),
    config
  );
}
