import React from 'react';
import {setConnect} from './../../Redux/loguserreducer';
import {connect} from 'react-redux';

class LoginContainer extends React.Component {
    
    state = {
        login : this.props.userLogin, 
        password: this.props.userPassword
    };

    onLoginChange = (e) => { this.setState( { login : e.currentTarget.value } ) }

    onPasswordChange = (e) => { this.setState({password: e.currentTarget.value}) }
    
    connectedUser = () => { this.props.setConnect(this.state.login, this.state.password) }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.userPassword !== this.props.userPassword) this.setState({password : this.props.userPassword})
    }

    render() {
        if (this.props.userId === 0) {
        return (
            <div className='sdelkamain'>
                <input type="text" 
                        placeholder="Enter your login" 
                        value={ this.state.login } 
                        onChange={ this.onLoginChange }
                        >
                </input>
                <input type="text" 
                        placeholder="Enter your password" 
                        value={ this.state.password }
                        onChange={ this.onPasswordChange } 
                        >
                </input>
                    <button onClick={ this.connectedUser }>
                            Вхід
                    </button>
            </div>
        )}
        else return null
    }
}

let mapStateToProps = (state) => {
    return {
        userLogin : state.loguser.userLogin,
        userPassword : state.loguser.userPassword,
        userId : state.loguser.userId
    }
}

export default connect(mapStateToProps, { setConnect })(LoginContainer);
