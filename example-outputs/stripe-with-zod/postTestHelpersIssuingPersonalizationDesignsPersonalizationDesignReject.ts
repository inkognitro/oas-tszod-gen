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

export const postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      personalization_design: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          expand: z.array(z.string()).optional(),
          rejection_reasons: z.object({
            card_logo: z
              .array(
                z.enum([
                  'geographic_location',
                  'inappropriate',
                  'network_name',
                  'non_binary_image',
                  'non_fiat_currency',
                  'other',
                  'other_entity',
                  'promotional_material',
                ])
              )
              .optional(),
            carrier_text: z
              .array(
                z.enum([
                  'geographic_location',
                  'inappropriate',
                  'network_name',
                  'non_fiat_currency',
                  'other',
                  'other_entity',
                  'promotional_material',
                ])
              )
              .optional(),
          }),
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

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
        rejection_reasons: {
          card_logo?: (
            | 'geographic_location'
            | 'inappropriate'
            | 'network_name'
            | 'non_binary_image'
            | 'non_fiat_currency'
            | 'other'
            | 'other_entity'
            | 'promotional_material'
          )[];
          carrier_text?: (
            | 'geographic_location'
            | 'inappropriate'
            | 'network_name'
            | 'non_fiat_currency'
            | 'other'
            | 'other_entity'
            | 'promotional_material'
          )[];
        };
      }
    >,
    {
      personalization_design: string;
    }
  >;

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectResponse =

    | ResponseUnion<
        200,
        ResponseBodyData<'application/json', Issuing_Personalization_design>
      >
    | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectRequestResult =
  RequestResult<
    PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectRequest,
    PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectResponse
  >;

export function postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignReject(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectEndpointSchema,
      payload
    ),
    config
  );
}
