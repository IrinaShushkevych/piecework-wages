import React from 'react';

let SelectionConditions = (props) => {
    
    console.log("Hello1111");

    let SD = () => {
        console.log(props.store.state.dataSelectionConditions.length);
        if ( props.store.state.DataSelectionConditions.length > 0 ){
            return (<label>Selection</label>);
        } else {
            return '';
        }
    }

    return(
        <div>
           {SD()}
        </div>
    )
}

export default SelectionConditions;