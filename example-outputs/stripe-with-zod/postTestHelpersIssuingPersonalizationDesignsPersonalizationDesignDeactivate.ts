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

export const postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      personalization_design: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          expand: z.array(z.string()).optional(),
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

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
      }
    >,
    {
      personalization_design: string;
    }
  >;

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateResponse =

    | ResponseUnion<
        200,
        ResponseBodyData<'application/json', Issuing_Personalization_design>
      >
    | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateRequestResult =
  RequestResult<
    PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateRequest,
    PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateResponse
  >;

export function postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateEndpointSchema,
      payload
    ),
    config
  );
}
