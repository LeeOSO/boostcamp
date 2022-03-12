import {
    CHANGE_LIST, CHANGE_PROGRAM,
    HIDE_LOADING,
    SHOW_LOADING, WORK_OUT
} from "./actionTypes";
import axios from "axios";
import {Alert} from "react-native";

const changeList = (data) => ({
    data: data,
    type: CHANGE_LIST,
});


const changeProgram = (data) => ({
    data: data,
    type: CHANGE_PROGRAM,
});

const changeWorkOut = (data) => ({
    data: data,
    type: WORK_OUT,
});

export const getList = () => {
    return (dispatch) => {
        dispatch(loading());
        axios.post('https://api.boostcamp.link/app/coach_program/list').then((res) => {
            console.log(JSON.stringify(res));
            const data = res.data.data;
            dispatch(changeList(data));
        }).catch((res) => {
            console.log('error=' + JSON.stringify(res));
        }).finally(() => {
            dispatch(hideLoading());
        });
    };
};

export const getProgram = (program_id) => {
    return (dispatch) => {
        dispatch(loading());
        axios.post('https://api.boostcamp.link/app/coach_program/get', {program_id: program_id}).then((res) => {
            console.log(JSON.stringify(res));
            const data = res.data.data;
            dispatch(changeProgram(data));
        }).catch((res) => {
            console.log('error=' + JSON.stringify(res));
        }).finally(() => {
            dispatch(hideLoading());
        });
    };
};

export const loading = () => ({
    type: SHOW_LOADING
});

export const hideLoading = () => ({
    type: HIDE_LOADING
});

export const getWorkOut = () => {
    return (dispatch) => {
        dispatch(loading());
        axios.post('https://api.boostcamp.link/app/coach_program/workout/get').then((res) => {
            console.log(JSON.stringify(res));
            const data = res.data;
            if (data.error) {
                dispatch(changeWorkOut(data.error));
                Alert.alert('Network failed', 'workout error', [{text: 'OK'}], {cancelable: false});
            } else {
                dispatch(changeWorkOut(data));
            }
        }).catch((res) => {
            console.log('error=' + JSON.stringify(res));
            Alert.alert('Network failed', 'workout error', [{text: 'OK'}], {cancelable: false});
        }).finally(() => {
            dispatch(hideLoading());
        });
    };
};

