import React from 'react';
import ModalTable from '../Modal/modaltable';
import ModalPassword from '../Modal/modalpassword';

export default class ModalForm extends React.Component {

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
        console.log('save value form');
        console.log(this.state.values);
    }

    componentDidMount() {
        if (this.props.refCode === 0) {
            this.setState({values : this.props.refData});
        }
    }

    render (){
        let stylemodal = {};
        let str = [];
        if (this.props.refCode === 0) {
            stylemodal = { width : '300px', 
                height : '100px', 
                top: (window.innerHeight / 2 - 50),
                left : (window.innerWidth / 2 -150)
            };
            str = <ModalPassword refHeader = {this.props.refHeader}
                                refData = {this.props.refData}
                                closeModalForms = {this.props.closeModalForms}/>;
        } else
        if (this.props.refCode === 2) {
            let lngdata = this.props.refData.length * 35;
            if ( window.innerHeight <= (lngdata + 150) ) 
                lngdata = window.innerHeight - 100;
             else 
                lngdata = lngdata + 150;
            stylemodal = { width : '500px', 
                        height : lngdata, 
                        top: (window.innerHeight / 2 - (lngdata+100)/2),
                        left : (window.innerWidth / 2 -250)
            };
            str = <ModalTable refid = {this.props.refId}
                              refHeader = {this.props.refHeader}
                              refData = {this.props.refData}
                              refCombo = {this.props.refCombo}
                              closeModalForms = {this.props.closeModalForms} 
                              heightForm = {lngdata} 
                              refbut = {this.props.refBut} 
                              setRefData = {this.props.setRefData} 
                              selectDov = {this.props.selectDov} />;
        }
        return  <> <div id="modal_form" style = {stylemodal}>
                        <div style = {{height : '10px'}}><span id="modal_close" onClick = {()=>{this.closeModal()}}>X</span></div>
                        {str}
                    </div>
                    <div id="overlay"></div>
                </>
                
    }
} 