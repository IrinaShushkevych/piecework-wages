import React from 'react';
import LoginContainer from './Component/Login/logincontainer';
import MainContainer from './Component/MainBody/maincontainer';
import {connect} from 'react-redux';
import {setConnect} from './Redux/loguserreducer';

const App = class extends  React.Component {
    componentDidMount() {
        let log = window.sessionStorage.getItem('login');
        let pass = window.sessionStorage.getItem('password');
        if (log  && pass) this.props.setConnect(log, pass);
    };

    render(){    
        if (this.props.userId === 0) {
            return <div>
                < LoginContainer />
            </div>
        } else {
            return <div>
                <MainContainer />
            </div>
        }
    }
}

let mapStateToProps = (state) => {
    return {
        userId : state.loguser.userId
    }
}

export default connect(mapStateToProps, {setConnect})(App);