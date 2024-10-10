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
import {Issuing_Personalization_design} from './issuing';
import {Error} from './schemas';

export const postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject',
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
