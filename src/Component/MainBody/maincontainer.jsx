import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import {setDisconect} from './../../Redux/loguserreducer';
import MainMenus from './mainmenu';
import DovidnukContainer from './../DataDovidnuk/dovidnukcontainer';


class MainContainer extends React.Component {
    render() {
        if (this.props.userId === 0) {
            return null;
        } else { 
            return  <BrowserRouter>
                        <MainMenus userId = {this.props.userId} selectMainMenu = {this.props.selectMainMenu} DisconectingUser = {this.props.setDisconect}/>
                        <Route exact path='/' />
                        <Route path='/Dovidnuk' render={() => <DovidnukContainer {...this.props} />} />
                        
                    </BrowserRouter>
        }
    }
};

let mapStateToProps = (state) => {
    return {
        userId : state.loguser.userId, 
        selectMainMenu : state.loguser.selectMainMenu,
        userSelectMenu : state.loguser.userSelectMenu
    }
};

export default connect(mapStateToProps, {setDisconect})(MainContainer);