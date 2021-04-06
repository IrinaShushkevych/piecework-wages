import React from 'react';
import TableRow from './tablebody';
import TableAddRow from './tableaddrow';
import ModalForm from './../Modal/modalform';


let Tables = ({dataSelectionConditions, selectedDataSelectionConditions, tableHeader, tableData, tableRowCombo, selectdov, selectdovrow, dovButtons, selectRow, setEditRow, clickButton, deleteRow, isModal, refId, refCode, refType, 
                refFileResult, refHeader, refData, refCombo, closeModalForms, refBut, setRefData, userLogin}) => {

    let TableHeaderButton = dovButtons.map((a, index) => { if (a.in_row) return <th key = {'b'+index}></th>});

    let TableHeader = tableHeader.map((a, index) => {
        return <th key = {index}>{a.name_col}</th>
    });

    let TableBody = tableData.map((a, index) => { 
        return <TableRow tableHeader={tableHeader} 
                         tableRowCombo={tableRowCombo}
                         dovbutton={dovButtons}
                         tablerow={a} 
                         index={index} 
                         selectdovrow={selectdovrow} 
                         selectRow={selectRow} 
                         selectDov={selectdov}
                         dataSelectionConditions={dataSelectionConditions}
                         selectDataSelectionConditions={selectedDataSelectionConditions}
                         setEditRow={setEditRow} 
                         clickButton={clickButton}
                         deleteValue={deleteRow}
                         userLogin={userLogin}
                         isModal={isModal}
                         refId={refId}
                         refCode={refCode}
                         refType={refType}
                         refFileResult={refFileResult}
                         refHeader={refHeader}
                         refData={refData}
                         />;        
    });

    let T = () => {
        if ( tableHeader.length > 0 ){
            return <table className='TableDespatch'>  
                    <tbody>
                        <tr key = '-2'> 
                            {TableHeader}
                            {TableHeaderButton} 
                        </tr>
                        <TableAddRow tableHeader = {tableHeader} 
                                    tableRowCombo = {tableRowCombo}
                                    dovbutton = {dovButtons}
                                    tablerow = {[]} 
                                    index = {-1} 
                                    dataSelectionConditions={dataSelectionConditions}
                                    selectDataSelectionConditions={selectedDataSelectionConditions}
                                    selectdovrow = {selectdovrow} 
                                    selectRow = {selectRow} 
                                    selectDov = {selectdov}
                                    setEditRow = {setEditRow} 
                                    clickButton = {clickButton}
                                    deleteValue = {deleteRow}
                                    userLogin = {userLogin}
                         />
                        {TableBody}
                    </tbody>
                </table>

    } else {
            return '';
        }
    }
    let DB = dovButtons.map((a, index) => {
        if (!a.in_row) return <button key = {index} value = {a.id_dovidnuk}>{a.name_button}</button>
        return null;
    });

    let ModalForms = () => { 
        if (isModal === 1) {
            return <ModalForm refId = {refId}
                            refBut = {refBut}
                            refCode = {refCode}
                            refType = {refType}
                            refFileResult = {refFileResult}
                            refHeader = {refHeader}
                            refData = {refData}
                            refCombo = {refCombo}
                            closeModalForms = {closeModalForms}
                            setRefData = {setRefData}
                            selectDov = {selectdov}
            />
        }
    }
                
    return(
        <div>
           {DB}
           {T()}
           {ModalForms()}
        </div>
    )
}

export default Tables;