import React from 'react';
import SelectionConditions from './../DataDovidnuk/selectionconditions';
import Tables from './../DataDovidnuk/tables';

let DataDovidnuk = (props) => {
    
    let Dovidnuku = () => {
        if ( props.store.state.DataSelectionConditions.length > 0 ){
            return <SelectionConditions store={props.store}/>;
        } else {
            return <Tables store={props.store}/>;
        }
    }

    return(
        <div>
           {Dovidnuku()}
        </div>
    )
}

export default DataDovidnuk;