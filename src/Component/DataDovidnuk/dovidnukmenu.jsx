import React from 'react';
import {NavLink} from 'react-router-dom';

let DovidnukMenu = ({userId, DataDovidnuk, selectDovidnuk, userLogin}) => {

    let SecMenu = DataDovidnuk.map((a) => {
                                        return (
                                                <NavLink key={a.code_dovid}  className='dovbutton' to = '/Dovidnuk' onClick={ () => {
                                                                                        selectDovidnuk(a.code_dovid, userId, userLogin);
                                                                                        window.sessionStorage.setItem('dovcode', a.code_dovid)}}>
                                                    <span>
                                                        {a.name_dovid}
                                                    </span>
                                                </NavLink>
                                        )})

    return(
        <div>
            <hr />
            <div className='wraper'>
                <div className='navdiv'>
                    <div className='ribbon'>
                        {SecMenu}
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default DovidnukMenu;