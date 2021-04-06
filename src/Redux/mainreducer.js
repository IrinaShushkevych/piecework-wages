const LOGIN = 'login';
const LOGOUT = 'logout';

let initialState = {

    SelectMainMenu : [
          {name_dovid :'Адміністрування', code_dov:"1"}, 
          {name_dovid :'Табелювання', code_dov:"2"},
          {name_dovid :'Довідник', code_dov:"3"}
    ]
}

export const setLoginAction = (log, pas) => ({type : LOGIN, logname : log, password: pas})
export const setLogoutAction = () => ({type : LOGOUT})

let mainReducer = (state = initialState, action)  => {
    switch(action.type){
        case LOGIN :
            state.userLogin = action.logname;
            state.userPassword = action.password; 
            state.paths = '/main';
            return state;
        case LOGOUT :
                state.userLogin = '';
                state.userPassword = ''; 
                state.paths = '/';
                return state;
        default : return state;
    }
}

export default mainReducer;