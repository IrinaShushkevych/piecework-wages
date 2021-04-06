import React from 'react';

let DovidnukSelections = ({dataSelectionConditions, selectedData, selectdov, selectSelectionConditions, userLogin}) => {

    let DovSel = dataSelectionConditions.map((a, index) => {
            return (
                <div key = 'dovselect'>
                    <label> {a.field_caption} </label>
                    <select key = {index}
                            data-key = {index} 
                            className= 'users_select' 
                            id={a.table_user_select} 
                            value={selectedData[index]} 
                            onChange = {(e) => {
                                    selectSelectionConditions(e.target.getAttribute('data-key'), e.target.value, selectdov, userLogin)
                                }}>
                        <option key = '-1' value='-1'></option>
                        {a.data_select.map((b, indexb) => {
                            return ( <option key = {indexb} value={b.field_user_id}>{b.field_user_view}</option> )
                        })}
                    </select>
                </div>
             )})
 
    if (dataSelectionConditions.length > 0) {
        return ( <div> {DovSel} </div>) }
        else return null;
}

export default DovidnukSelections;