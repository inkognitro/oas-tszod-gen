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

export const postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate',
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

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateRequest =
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

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateResponse =

    | ResponseUnion<
        200,
        ResponseBodyData<'application/json', Issuing_Personalization_design>
      >
    | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateRequestResult =
  RequestResult<
    PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateRequest,
    PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateResponse
  >;

export function postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateEndpointSchema,
      payload
    ),
    config
  );
}
