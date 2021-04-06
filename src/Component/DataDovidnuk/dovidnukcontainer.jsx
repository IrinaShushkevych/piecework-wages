import React from 'react';
import { connect } from 'react-redux';
import {buttonClick, selectDovidnuk, getDovidnuku, selectSelectionConditions, setTable, selectRow, setEditRow, deleteRow, closeModalForms, setRefData} from './../../Redux/dovidnukreducer';
import DovidnukMenu from './dovidnukmenu';
import DovidnukSelections from './dovidnukselections';
import Tables from './tables';

class DovidnukContainer extends React.Component{
    componentDidMount (){
        this.props.getDovidnuku(this.props.userId);
        let dov_id = window.sessionStorage.getItem('dovcode');
        if (dov_id) this.props.selectDovidnuk(dov_id, this.props.userId, this.props.userLogin)
    }
     
    render(){ 
        return <div>
                <DovidnukMenu   userId = {this.props.userId} 
                                userLogin = {this.props.userLogin}
                                DataDovidnuk = {this.props.dovidnuk.dataDovidnuk} 
                                selectDovidnuk = {this.props.selectDovidnuk} />
                <DovidnukSelections dataSelectionConditions = {this.props.dovidnuk.dataSelectionConditions} 
                                    selectedData = {this.props.dovidnuk.selectedDataSelectionConditions}
                                    selectdov = {this.props.dovidnuk.selectDov}
                                    userLogin = {this.props.userLogin}
                                    selectSelectionConditions = {this.props.selectSelectionConditions} />
                <Tables tableHeader = {this.props.dovidnuk.tableHeader}
                        tableData = {this.props.dovidnuk.tableData} 
                        tableRowCombo = {this.props.dovidnuk.tableRowCombo}
                        selectdov = {this.props.dovidnuk.selectDov}
                        selectdovrow = {this.props.dovidnuk.selectDovRow}
                        dataSelectionConditions = {this.props.dovidnuk.dataSelectionConditions}
                        selectedDataSelectionConditions = {this.props.dovidnuk.selectedDataSelectionConditions}
                        dovButtons = {this.props.dovidnuk.dovButtons}
                        isModal = {this.props.dovidnuk.isModal}
                        refId = {this.props.dovidnuk.refId}
                        refCode = {this.props.dovidnuk.refCode}
                        refType = {this.props.dovidnuk.refType}
                        refFileResult = {this.props.dovidnuk.refFileResult}
                        refHeader = {this.props.dovidnuk.refHeader}
                        refData = {this.props.dovidnuk.refData}
                        refCombo = {this.props.dovidnuk.refCombo}
                        refBut = {this.props.dovidnuk.refBut}
                        selectRow = {this.props.selectRow} 
                        setEditRow = {this.props.setEditRow} 
                        clickButton = {this.props.buttonClick}
                        deleteRow = {this.props.deleteRow}
                        userLogin = {this.props.userLogin}
                        closeModalForms = {this.props.closeModalForms}
                        setRefData = {this.props.setRefData}
                        />      
            </div>
    }
} 

let mapStateToProps = (state) => {
    return {
        dovidnuk : state.dovidnuk,
        userId : state.loguser.userId,
        userLogin : state.loguser.userLogin
    }
}

export default connect(mapStateToProps, {buttonClick, selectDovidnuk, getDovidnuku, selectSelectionConditions, setTable, selectRow, setEditRow, deleteRow, 
                                         closeModalForms, setRefData})(DovidnukContainer);



