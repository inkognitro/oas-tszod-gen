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
} from '@example-outputs/stripe/core';
import {Issuing_Personalization_design, Error} from '@example-outputs/stripe';

export const postIssuingPersonalizationDesignsPersonalizationDesignEndpointSchema =
  {
    path: '/v1/issuing/personalization_designs/{personalization_design}',
    method: 'post',
    supportedSecuritySchemas: [],
    bodyByContentType: {
      'application/x-www-form-urlencoded': {},
    },
    responseByStatus: {
      '200': {
        bodyByContentType: {
          'application/json': {},
        },
      },
      default: {
        bodyByContentType: {
          'application/json': {},
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
