import {
  z_Issuing_Personalization_design,
  z_Error,
  Issuing_Personalization_design,
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

export const postIssuingPersonalizationDesignsPersonalizationDesignEndpointSchema =
  {
    path: '/v1/issuing/personalization_designs/{personalization_design}',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      personalization_design: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          card_logo: z.union([z.string(), z.enum([''])]).optional(),
          carrier_text: z
            .union([
              z.object({
                footer_body: z.union([z.string(), z.enum([''])]).optional(),
                footer_title: z.union([z.string(), z.enum([''])]).optional(),
                header_body: z.union([z.string(), z.enum([''])]).optional(),
                header_title: z.union([z.string(), z.enum([''])]).optional(),
              }),
              z.enum(['']),
            ])
            .optional(),
          expand: z.array(z.string()).optional(),
          lookup_key: z.union([z.string(), z.enum([''])]).optional(),
          metadata: z.record(z.string()).optional(),
          name: z.union([z.string(), z.enum([''])]).optional(),
          physical_bundle: z.string().optional(),
          preferences: z
            .object({
              is_default: z.boolean(),
            })
            .optional(),
          transfer_lookup_key: z.boolean().optional(),
        }),
      },
    },
    responseByStatus: {
      '200': {
        bodyByContentType: {
          'application/json': {
            zodSchema: z_Issuing_Personalization_design,
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

export type PostIssuingPersonalizationDesignsPersonalizationDesignRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        card_logo?: string | '';
        carrier_text?: (
          | {
              footer_body?: string | '';
              footer_title?: string | '';
              header_body?: string | '';
              header_title?: string | '';
            }
          | ''
        ) &
          Partial<{
            footer_body?: string | '';
            footer_title?: string | '';
            header_body?: string | '';
            header_title?: string | '';
          }>;
        expand?: string[];
        lookup_key?: string | '';
        metadata?: {
          [key: string]: string;
        };
        name?: string | '';
        physical_bundle?: string;
        preferences?: {
          is_default: boolean;
        };
        transfer_lookup_key?: boolean;
      }
    >,
    {
      personalization_design: string;
    }
  >;

export type PostIssuingPersonalizationDesignsPersonalizationDesignResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Personalization_design>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingPersonalizationDesignsPersonalizationDesignRequestResult =
  RequestResult<
    PostIssuingPersonalizationDesignsPersonalizationDesignRequest,
    PostIssuingPersonalizationDesignsPersonalizationDesignResponse
  >;

export function postIssuingPersonalizationDesignsPersonalizationDesign(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingPersonalizationDesignsPersonalizationDesignRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingPersonalizationDesignsPersonalizationDesignRequestResult> {
  return requestHandler.execute(
    createRequest(
      postIssuingPersonalizationDesignsPersonalizationDesignEndpointSchema,
      payload
    ),
    config
  );
}
