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

export const getIssuingPersonalizationDesignsPersonalizationDesignEndpointSchema =
  {
    path: '/v1/issuing/personalization_designs/{personalization_design}',
    method: 'get',
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
