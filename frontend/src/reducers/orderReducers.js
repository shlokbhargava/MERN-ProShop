import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_RESET, MY_ORDERS_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_RESET, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_ORDER_REQUEST:
            return { loading: true }
        case CREATE_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case CREATE_ORDER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true }
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true, paymentId: action.payload }
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const orderDeliverReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_DELIVER_REQUEST:
            return { loading: true }
        case ORDER_DELIVER_SUCCESS:
            return { loading: false, success: true }
        case ORDER_DELIVER_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}

export const myOrderReducer = (state = { orders: [] }, action) => {
    switch(action.type) {
        case MY_ORDERS_REQUEST:
            return { loading: true }
        case MY_ORDERS_SUCCESS:
            return { loading: false, orders: action.payload.orders, pages: action.payload.pages, page: action.payload.page }
        case MY_ORDERS_FAIL:
            return { loading: false, error: action.payload }
        case MY_ORDERS_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true}
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

 