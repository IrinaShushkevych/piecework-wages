import {userAPI} from './../API/apiuser';

const LOGIN = 'login';
const LOGOUT = 'logout';
const SETMENU = 'set_menu';

let initialState = {
        userLogin : '',
        userPassword : '',
        userName : '',
        userId : 0,
        userAccess : 0,
        userRoles :null,
        selectMainMenu : []
    }

let logUserReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN : 
            window.sessionStorage.setItem('login', action.logname);
            window.sessionStorage.setItem('password', action.password);
            return  {
                ...state, 
                userLogin : action.logname,
                userPassword : action.password,
                userId : action.userid,
                userName : action.name,
                ...state.selectMainMenu,
                selectMainMenu : action.roles
            }
        case LOGOUT : 
            return {
                ...state, 
                userPassword : '',
                userId : 0
            }
        case SETMENU :
            return {
                ...state,
                userSelectMenu : action.comp
            }
        default : return state;
    }
}

export const setConnectAction = (log, pas, id, name_user, uroles) => ({type : LOGIN, logname : log, password: pas, userid: id, name: name_user, roles: uroles});
export const setDisconnectAction = () => ({type : LOGOUT});
export const setSelectMenu = (comp) => ({type : SETMENU, component: comp});

export const setConnect = (log,pas) => (dispatch) => { 
    userAPI.getUsers(log, pas).then((response) => {
        if (response.data['resultCode'] === 1) {
            alert(response.data['value']);
        } else {
            let uid = response.data['value'][0]['id'];
            let uname = response.data['value'][0]['name_user'];
            userAPI.getUserRoles(uid).then((response) => {
                dispatch(setConnectAction( log, pas, uid, uname, response.data ));
            })
        }
    })
    
}

export const setDisconect = () => (dispatch) => {
    dispatch(setDisconnectAction())
}

export default logUserReducer;