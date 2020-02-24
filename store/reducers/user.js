const initialState = {
    isLogined: false,
    logining: false,
    user: {}
}

export default (state = initialState, action) => {
    switch(action.type){
        case "USER_LOGIN":
            return {...state, logining: true};
        case "USER_LOGIN_SUCCESS":
            return {...state, logining: false, isLogined: true, user: action.user};
        case "USER_LOGIN_FAIL":
            return {...initialState, error: action.error};   
        case "USER_LOGOUT":
            return {...initialState};       
        default:
            return state;
    }
};