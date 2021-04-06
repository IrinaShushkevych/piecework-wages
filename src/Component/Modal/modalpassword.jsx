import React from 'react';

export default class ModalPassword extends React.Component {

    state = {
        values : {}
    }

     setValues(index, val){
        let arr = {...this.state.values};
        arr[index] = val;
        this.setState({values : arr});
    }

    closeModal(){
        this.props.closeModalForms();
    }

    saveValue(){
        console.log('save value password');
        console.log(this.state.values);
    }

    componentDidMount() {
        this.setState({values : this.props.refData});
    }

    render (){
        let stylecontainer = {};
        let str = [];
        let j = 0;
        stylecontainer = { width : '300px', height : '100px', overflow : 'visible'};
        for (var i in this.state.values){
            str[j] = <p>
                        <label> {this.props.refHeader[i]} </label>
                        <input type='password' data-key = {i} value = {this.state.values[i]} onChange= {(e) => {this.setValues(e.target.getAttribute('data-key'),e.target.value)}} />
                    </p>;
            j++;
        }
        str[j] = <p>
                    <button onClick = {() => {this.saveValue()}}>Зберегти</button>
                    <button onClick = {() => {this.closeModal()}}>Відмінити</button>
                </p>;
        return  <> 
                    <div className = "container" style = {stylecontainer}>{str}</div>
                </>
                
    }
} 