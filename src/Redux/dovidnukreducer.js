import {dovidnukAPI} from './../API/apidovidnuk';

const SETDOV = 'set_selected_dovidnuk';
const SETALLDOV = 'set_all_dovidnuku';
const SELECTCOND = 'get_selection_condition';
const DOVBUTTON = 'get_dovidnuk_buttons';
const USERSELECTCOND = 'user_sected_selection_condition';
const DOVTABLEHEADER = 'get_table_header';
const DOVTABLEDATA = 'get_table_data';
const SELDOVROW = 'set_user_select_row';
const EDITROW = 'set_user_edit_row';
const SELBUT = 'set_data_selected_button';
const CLOSEMODAL = 'close_modal_form';

let initialState = {
    selectDov : 0,
    selectDovRow : -1,
    is_view_table : 1,
    dataDovidnuk : [],
    dataSelectionConditions : [],
    selectedDataSelectionConditions : [],
    dovButtons : [],
    tableHeader : [],
    tableData : [],
    tableRowCombo : [],
    refId : 0,
    refBut : 0,
    refCode : -1,
    refType : '',
    refFileResult : '',
    refHeader : [],
    refData : [],
    refCombo : [],
    isModal : 0
}

const setDovidnukAction = (code_dov) => ({type : SETDOV, id_dov : code_dov});
const setDovidnukuAction = (dov) => ({type : SETALLDOV, arrdov : dov});
const setSelectConditions = (selcond) => ({type : SELECTCOND, selcondarr : selcond});
const setButtons = (dovbutton) => ({type : DOVBUTTON, butt : dovbutton});
const setUserSelectConditions = (index, indexdata) => ({type : USERSELECTCOND, dataindex : index, data : indexdata});
const setTableHeader = (data) => ({type : DOVTABLEHEADER, tableheader : data});
const setTableData = (data) => ({type : DOVTABLEDATA, tabledatas : data});
const setSelectRow = (data) => ({type : SELDOVROW, row : data});
//const setUserEditRow = (index, data) => ({type : EDITROW, indexrow : index, datarow : data});
const setSelectButton = (refbut, refcode, reftype, refheader, refdata, refcombo,refid, ismodal, refresult) =>({type : SELBUT, ref_but : refbut, ref_code : refcode, ref_type : reftype, ref_header : refheader, ref_data : refdata, ref_combo : refcombo, ref_id : refid, is_modal : ismodal, ref_result : refresult})
const closeModalForm = () => ({type :CLOSEMODAL});

let dovidnukReducer = (state = initialState, action) => {

    switch(action.type){
        case SETDOV :
            return {
                ...state,
                selectDov : action.id_dov
            }
        case SETALLDOV : 
            return {
                ...state,
                dataDovidnuk : action.arrdov
            }
        case SELECTCOND :
            return {
                ...state,
                dataSelectionConditions : action.selcondarr,
                selectedDataSelectionConditions : action.selcondarr.map((a) => {return -1})
                }
        case DOVBUTTON : 
            return {
                ...state,
                dovButtons : action.butt
            }
        case USERSELECTCOND : 
            let d = [];
            for (var i = 0; i< state.selectedDataSelectionConditions.length; i++){
                if (i === action.dataindex) 
                    d[i] = action.data
                else d[i] = state.selectedDataSelectionConditions[i]
            }
            return {                    
                ...state,
                selectedDataSelectionConditions : d
            }
        case DOVTABLEHEADER :
            return {
                ...state,
                tableHeader : action.tableheader
            }
        case DOVTABLEDATA : 
            return {
                ...state,
                tableData : action.tabledatas['table'],
                tableRowCombo : action.tabledatas['combo']
            }
        case SELDOVROW :
            return {
                ...state,
                selectDovRow : action.row
            }
        case EDITROW : 
            return {
                ...state,
                tableData : state.tableData.map((a, index) => { if (index === action.indexrow) {return action.datarow }else {return a}})
                
            }
            case SELBUT :
                return {
                    ...state,
                    refBut : action.ref_but,
                    refId : action.ref_id,
                    refCode : action.ref_code,
                    refType : action.ref_type,
                    refHeader : action.ref_header,
                    refData : action.ref_data,
                    refCombo : action.ref_combo,
                    isModal : action.is_modal,
                    refFileResult : action.ref_result
                }
            case CLOSEMODAL :
                return {
                    ...state,
                    isModal : 0
                }
        default : return state;
    }
}

export const getDovidnuku = (uid) => (dispatch) => {
    dovidnukAPI.getDovidnuk(uid).then( (response) => {
        dispatch(setDovidnukuAction(response.data))
    })
}

export const selectDovidnuk = (id_dov, uid, login) => async (dispatch) => {
    dispatch(setDovidnukAction(id_dov));
    dovidnukAPI.getSelectionConditions(id_dov, uid).then((response) => {
        dispatch(setSelectConditions(response.data));
    })
    dovidnukAPI.getDovButtons(id_dov).then((response) => {
        dispatch(setButtons(response.data));
    })
    let response = await dovidnukAPI.getTableHeader(id_dov, '');
    if (response) {
        dispatch(setTableHeader(response.data));
    }
    let response1 = await dovidnukAPI.getTableData(id_dov, -9, login);
    if (response1) {
        dispatch(setTableData(response1.data));
    }
}

export const selectSelectionConditions = (index, indexdata, iddov, login) => async (dispatch) => {
    dispatch(setUserSelectConditions(index, indexdata));
    let response = await dovidnukAPI.getTableData(iddov, indexdata, login);
    if (response) {
        dispatch(setTableData(response.data));
    }
}

export const setTable = (indexdata, iddov, login) => async (dispatch) => {
    let response = await dovidnukAPI.getTableHeader(iddov, '');
    if (response) {
        dispatch(setTableHeader(response.data));
    }
    let response1 = await dovidnukAPI.getTableData(iddov, indexdata, login);
    if (response1) {
        dispatch(setTableData(response1.data));
    }
}

export const selectRow = (indexrow) => (dispatch) =>{
    dispatch(setSelectRow(indexrow));
}

export const setEditRow = (indexrow, datarow, idrow, iddov, d, id_select, userLogin) => async (dispatch) => {
    let response = await dovidnukAPI.setUpdateTableRow(iddov, d, idrow);
    if (response) {
        let response1 = await dovidnukAPI.getTableData(iddov, id_select, userLogin);
        if (response1) {
            dispatch(setTableData(response1.data));
            //dispatch(setUserEditRow(indexrow, datarow));
        }
    }
}

export const deleteRow =  (id_dov, id_row, login, id_select) => async (dispatch) => {
    let response = await dovidnukAPI.deleteRowDovidnuk(id_dov, id_row);
    if (response) {
        let response1 = await dovidnukAPI.getTableData(id_dov, id_select, login);
        if (response1) {
            dispatch(setTableData(response1.data));
        }
    }
}

export const buttonClick = (id_dov, id_but, id_row) => async (dispatch) => {
   let response = await dovidnukAPI.getSelectButton(id_dov, id_but);
    if (response) {
        if (response.data['0'] === 0) {
            dispatch(setSelectButton(id_but,
                                     response.data['0'],
                                     response.data['typedata'],
                                     response.data['fields'],
                                     response.data['fieldsdata'],
                                     [],
                                    id_row,
                                    1,
                                    response.data['textresult']
            ));
        } else
        if (response.data['0'] === 1) {
            dispatch(setSelectButton(id_but,
                                     response.data['0'],
                                     response.data['typedata'],
                                     [],
                                    [],
                                    [],
                                    id_row,
                                    0,
                                    ''
            ));
        } else {
            let response2 = await dovidnukAPI.getTableHeader(id_dov, id_but);
            let response1 = await dovidnukAPI.getSelectData(response.data['text'], id_dov, id_but, id_row);
            if (response1.status === 200 && response2.status === 200) {
console.log('-----table------');
console.log(response1.data['data']);
console.log(response2.data);

                dispatch(setSelectButton(id_but,
                                        response.data['0'],
                                        response.data['typedata'],
                                        response2.data,
                                        response1.data['data'],
                                        response1.data['combo'],
                                        id_row,
                                        1,
                                        ''
                ));
            }
        }
    }
}

export const closeModalForms = () => (dispatch) => {
    dispatch(closeModalForm());
}

export const setRefData = (id_dov, id_but, refdata, refdatacombo, ref_id) => async (dispatch) => {
    let response = await dovidnukAPI.setSelectData(id_dov, ref_id, refdata, refdatacombo, id_but);
    console.log('result insert reff data');
    console.log(response.data);
    if (response.status === 200)
        dispatch(setSelectButton(0, -1, '', [], [], [], 0, 0, ''));
}

export default dovidnukReducer;