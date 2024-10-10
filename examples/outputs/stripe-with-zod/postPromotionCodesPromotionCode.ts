import {z_Promotion_code, z_Error, Promotion_code, Error} from './schemas';
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

export const postPromotionCodesPromotionCodeEndpointSchema = {
  path: '/v1/promotion_codes/{promotion_code}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    promotion_code: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        restrictions: z
          .object({
            currency_options: z
              .record(
                z.object({
                  minimum_amount: z.number().int().safe().finite().optional(),
                })
              )
              .optional(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Promotion_code,
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

export type PostPromotionCodesPromotionCodeRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      restrictions?: {
        currency_options?: {
          [key: string]: {
            minimum_amount?: number; // int
          };
        };
      };
    }
  >,
  {
    promotion_code: string;
  }
>;

export type PostPromotionCodesPromotionCodeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Promotion_code>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPromotionCodesPromotionCodeRequestResult = RequestResult<
  PostPromotionCodesPromotionCodeRequest,
  PostPromotionCodesPromotionCodeResponse
>;

export function postPromotionCodesPromotionCode(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPromotionCodesPromotionCodeRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPromotionCodesPromotionCodeRequestResult> {
  return requestHandler.execute(
    createRequest(postPromotionCodesPromotionCodeEndpointSchema, payload),
    config
  );
}
