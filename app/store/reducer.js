import {
    CHANGE_LIST, CHANGE_PROGRAM,
    HIDE_LOADING,
    SHOW_LOADING, WORK_OUT
} from "./actionTypes";

const defaultState = {
    focused: false,
    mouseIn: false,
    list: [],
    page: 0,
    totalPage: 1,
    isLoading: false,
    loadingText: '',
    program: {}
};

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_LIST:
            return Object.assign({}, state, {
                list: action.data
            });
        case CHANGE_PROGRAM:
            let program = action.data;
            program.weeks.forEach((item) => {
                item.show = true;
                item.data = item.days;
                delete item.days;
            });
            return Object.assign({}, state, {
                program: action.data
            });

        case SHOW_LOADING:
            return Object.assign({}, state, {
                isLoading: true,
                loadingText: action.loadingText || ''
            });

        case HIDE_LOADING:
            return Object.assign({}, state, {
                isLoading: false,
                loadingText: ''
            });
        case WORK_OUT:
            return Object.assign({}, state, {
                isLoading: false,
                loadingText: ''
            });
        default:
            return state;
    }
};