import React from 'react';
import {NavLink} from 'react-router-dom';

let MainMenus = ({ userId, selectMainMenu,  DisconectingUser}) => {
    
    let MainMenu = selectMainMenu.map((a) => {
        return ( 
            <NavLink key={a.code_dov}  className='dovbutton' to={'/'+a.component} onClick = {() => window.sessionStorage.setItem('maincomp', '/'+a.component)}>
                <span>    
                    {a.name_dovid}
                </span>
            </NavLink> 
            )
    });
    
    if (userId === 0) {
        return null
    } else {
        return(
            <div className='wraper'>
                <div className='navdiv'>
                    <div className='ribbon'>
                        {MainMenu}
                        <NavLink className='dovbutton' to={'/'} onClick={() => {
                                                                        window.sessionStorage.removeItem('password'); 
                                                                        DisconectingUser()}}>
                            <span> Вихід </span>
                        </NavLink> 
                    </div>
                </div>
            </div>
        )
    }
}

export default MainMenus;