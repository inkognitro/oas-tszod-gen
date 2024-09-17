import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/petstore2/core';

export const deleteOrderEndpointSchema = {
path: '/store/order/{orderId}', 
method: 'delete', 
supportedSecuritySchemas: [], 
bodyByContentType: {}, 
responseByStatus: {
'400': {
bodyByContentType: {}
},
'404': {
bodyByContentType: {}
}
}
}

export type DeleteOrderPayload = {
'pathParams': {
'orderId': number; // int
};
}

export type DeleteOrderResponse = Response<400, any> | Response<404, any>

export type DeleteOrderRequestResult = RequestResult<Request, DeleteOrderResponse>

export function deleteOrder(requestHandler: RequestHandler, payload: DeleteOrderPayload, config?: RequestHandlerExecutionConfig): Promise<DeleteOrderRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: deleteOrderEndpointSchema}), config);}