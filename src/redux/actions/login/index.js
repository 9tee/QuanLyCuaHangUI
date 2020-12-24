import {LOGIN, LOGOUT, SET_TOKEN} from './action_types';

export default {
    login: (data) => ({
        type: LOGIN,
        params:{
            data,
        }
    }),
    logout: (data) => ({
        type: LOGOUT,
        params:{
            data,
        }
    }),
    setToken: (data) => ({
        type: SET_TOKEN,
        data,
    })
};