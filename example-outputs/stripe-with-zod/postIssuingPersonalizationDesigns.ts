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

export const postIssuingPersonalizationDesignsEndpointSchema = {
  path: '/v1/issuing/personalization_designs',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        card_logo: z.string().optional(),
        carrier_text: z
          .object({
            footer_body: z.union([z.string(), z.enum([''])]).optional(),
            footer_title: z.union([z.string(), z.enum([''])]).optional(),
            header_body: z.union([z.string(), z.enum([''])]).optional(),
            header_title: z.union([z.string(), z.enum([''])]).optional(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        lookup_key: z.string().optional(),
        metadata: z.record(z.string()).optional(),
        name: z.string().optional(),
        physical_bundle: z.string(),
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

export type PostIssuingPersonalizationDesignsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      card_logo?: string;
      carrier_text?: {
        footer_body?: string | '';
        footer_title?: string | '';
        header_body?: string | '';
        header_title?: string | '';
      };
      expand?: string[];
      lookup_key?: string;
      metadata?: {
        [key: string]: string;
      };
      name?: string;
      physical_bundle: string;
      preferences?: {
        is_default: boolean;
      };
      transfer_lookup_key?: boolean;
    }
  >
>;

export type PostIssuingPersonalizationDesignsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Personalization_design>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingPersonalizationDesignsRequestResult = RequestResult<
  PostIssuingPersonalizationDesignsRequest,
  PostIssuingPersonalizationDesignsResponse
>;

export function postIssuingPersonalizationDesigns(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingPersonalizationDesignsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingPersonalizationDesignsRequestResult> {
  return requestHandler.execute(
    createRequest(postIssuingPersonalizationDesignsEndpointSchema, payload),
    config
  );
}
