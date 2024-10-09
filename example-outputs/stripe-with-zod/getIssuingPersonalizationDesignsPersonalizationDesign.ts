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

export const getIssuingPersonalizationDesignsPersonalizationDesignEndpointSchema =
  {
    path: '/v1/issuing/personalization_designs/{personalization_design}',
    method: 'get',
    supportedSecuritySchemas: [],
    queryParamsZodSchema: z.object({
      expand: z.array(z.string()).optional(),
    }),
    pathParamsZodSchema: z.object({
      personalization_design: z.string(),
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

export type GetIssuingPersonalizationDesignsPersonalizationDesignRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      personalization_design: string;
    },
    {
      expand?: string[];
    }
  >;

export type GetIssuingPersonalizationDesignsPersonalizationDesignResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Personalization_design>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingPersonalizationDesignsPersonalizationDesignRequestResult =
  RequestResult<
    GetIssuingPersonalizationDesignsPersonalizationDesignRequest,
    GetIssuingPersonalizationDesignsPersonalizationDesignResponse
  >;

export function getIssuingPersonalizationDesignsPersonalizationDesign(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingPersonalizationDesignsPersonalizationDesignRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingPersonalizationDesignsPersonalizationDesignRequestResult> {
  return requestHandler.execute(
    createRequest(
      getIssuingPersonalizationDesignsPersonalizationDesignEndpointSchema,
      payload
    ),
    config
  );
}
