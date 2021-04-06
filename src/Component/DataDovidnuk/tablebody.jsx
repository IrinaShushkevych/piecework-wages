import React from 'react';

class TableRow extends React.Component {
    state = {
        selectRow : 0,
        datarow : {}
    }

    setSelectRow () {
        this.setState({selectRow : 1});
    }

    setEditValue (i, data){
        let arr = this.state.datarow;
        arr[i] = data;
        this.setState({datarow : arr});
    }

    saveEditValue (){
//        let d = {};
//        for (var i=0; i< this.props.tableHeader.length; i++){
//            d[i] = [];
//            d[i][0] = this.props.tableHeader[i]['name_table'];
//            if (this.props.tableRowCombo && this.props.tableRowCombo[this.props.tableHeader[i]['name_table']]) {
//                for (var j = 0; j < this.props.tableRowCombo[this.props.tableHeader[i]['name_table']].length; j++) 
//                    if (this.props.tableRowCombo[this.props.tableHeader[i]['name_table']][j]['name_col'] === this.props.tablerow[this.props.tableHeader[i]['name_table']]){
//                        d[i][1] = this.props.tableRowCombo[this.props.tableHeader[i]['name_table']][j]['id'] ;
 //                   if (this.props.tableRowCombo[this.props.tableHeader[i]['name_table']][j]['name_col'] === this.state.datarow[this.props.tableHeader[i]['name_table']])
//                        d[i][2] = this.props.tableRowCombo[this.props.tableHeader[i]['name_table']][j]['id'] ;
//                }
//            } else {
//                d[i][1] = this.props.tablerow[this.props.tableHeader[i]['name_table']];
//                d[i][2] = this.state.datarow[this.props.tableHeader[i]['name_table']];
//            }
//        }
//        this.props.setEditRow(this.props.index,  this.state.datarow, this.state.datarow['0'], this.props.selectDov, d);
//        this.setState({ selectRow : 0});
let d = {};
let id_select = 0;
var i = 0;
var ii = 0;
for (i = 0; i < this.props.dataSelectionConditions.length; i++) {
    if ((this.props.selectDataSelectionConditions[i] !== -1 ) && (this.props.selectDataSelectionConditions[i] !== 'undefined' )){
        d[ii] = [];
        d[ii][0] = this.props.dataSelectionConditions[i]['user_field']; 
        d[ii][1] = null; 
        for(var j = 0; j < this.props.dataSelectionConditions[i]['data_select'].length; j++){
            if (this.props.dataSelectionConditions[i]['data_select'][j]['field_user_id'] === this.props.selectDataSelectionConditions[i]){
                d[ii][2] = this.props.dataSelectionConditions[i]['data_select'][j]['field_id'];
                id_select = this.props.selectDataSelectionConditions[i];
            }
        }
        d[ii][3] = 'int'; 
        ii++;
    }
}

for (i=0; i< this.props.tableHeader.length; i++){
    d[ii+i] = [];
    d[ii+i][0] = this.props.tableHeader[i]['name_table'];
    d[ii+i][3] = this.props.tableHeader[i]['type_col'];
    if (this.props.tableRowCombo && this.props.tableRowCombo[this.props.tableHeader[i]['name_table']]) {
        d[ii+i][1] = null;
        d[ii+i][2] = null;
        for (j = 0; j < this.props.tableRowCombo[this.props.tableHeader[i]['name_table']].length; j++) {
            if (this.props.tableRowCombo[this.props.tableHeader[i]['name_table']][j]['name_col'] === this.props.tablerow[this.props.tableHeader[i]['name_table']])
                d[ii+i][1] = this.props.tableRowCombo[this.props.tableHeader[i]['name_table']][j]['id'] ;
            if (this.props.tableRowCombo[this.props.tableHeader[i]['name_table']][j]['name_col'] === this.state.datarow[this.props.tableHeader[i]['name_table']])
                d[ii+i][2] = this.props.tableRowCombo[this.props.tableHeader[i]['name_table']][j]['id'] ;
        }
    } else {
        d[ii+i][1] = this.props.tablerow[this.props.tableHeader[i]['name_table']];
        d[ii+i][2] = this.state.datarow[this.props.tableHeader[i]['name_table']];
    }
}
this.props.setEditRow(this.props.index,  this.state.datarow, this.state.datarow['0'], this.props.selectDov, d, id_select, this.props.userLogin);
this.setState({ selectRow : 0});
}

    unsaveEditValue (){
        let arr = {};
        arr[0] = this.props.tablerow[0];
        for (var i=0; i<this.props.tableHeader.length; i++)  { 
            arr[this.props.tableHeader[i]['name_table']] = this.props.tablerow[this.props.tableHeader[i]['name_table']]
        }
        this.setState({ datarow : arr, selectRow : 0});
    }

    deleteEditValue (){
        debugger;
        let id_select = 0;
        var i = 0;
        for (i = 0; i < this.props.dataSelectionConditions.length; i++) {
            if ((this.props.selectDataSelectionConditions[i] !== -1 ) && (this.props.selectDataSelectionConditions[i] !== 'undefined' )){
                for(var j = 0; j < this.props.dataSelectionConditions[i]['data_select'].length; j++){
                    if (this.props.dataSelectionConditions[i]['data_select'][j]['field_user_id'] === this.props.selectDataSelectionConditions[i]){
                        id_select = this.props.selectDataSelectionConditions[i];
                    }
                }
            }
        }
        this.props.deleteValue(this.props.selectDov, this.props.tablerow[0], this.props.userLogin, id_select);
        this.setState({ selectRow : 0});
    }

    clickButton (id_but){        
        this.props.clickButton(this.props.selectDov ,id_but, this.props.tablerow[0])
    }

    componentDidMount(){
        this.unsaveEditValue();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.tablerow !== this.props.tablerow) {
            let arr = {};
            arr[0] = this.props.tablerow[0];
            for (var i=0; i<this.props.tableHeader.length; i++)  { 
                arr[this.props.tableHeader[i]['name_table']] = this.props.tablerow[this.props.tableHeader[i]['name_table']]
            }
            this.setState({datarow : arr})
        }
    }

    RowCombo (i) {
        let s = '';
        if (this.props.tableRowCombo && this.props.tableRowCombo[this.props.tableHeader[i]['name_table']]) {
//            let val = -1;
//            for (var j = 0; j < this.props.tableRowCombo[this.props.tableHeader[i]['name_table']].length; j++) {
//                if (this.props.tableRowCombo[this.props.tableHeader[i]['name_table']][j]['name_col'] === this.state.datarow[this.props.tableHeader[i]['name_table']]) 
//                    val = this.props.tableRowCombo[this.props.tableHeader[i]['name_table']][j]['id']
//            }
                s = <td key = {i}><select className = 'dovinputtable'
//                                        value = {val}
                                        value = {this.state.datarow[this.props.tableHeader[i]['name_table']]}
                                        data-key = {this.props.tableHeader[i]['name_table']}                  
                                        onChange = {(e) => {this.setEditValue(e.target.getAttribute('data-key'), e.target.value)}}
                                        >
                                            <option key = {-1} value = {-1}></option>
                                        { this.props.tableRowCombo[this.props.tableHeader[i]['name_table']].map((a)=>{return <option key = {a.id} value = {a.name_col}>{a.name_col}</option>})}
                                </select></td>;
            } else 
                if (this.props.tableHeader[i]['type_col'] === 'log') {
                    s = <td key = {i}><input 
                                    type = 'checkbox' 
                                    data-key = {this.props.tableHeader[i]['name_table']}                  
                                    checked = {this.state.datarow[this.props.tableHeader[i]['name_table']]}
                                    onChange = {(e) => {
                                                        if (e.target.checked)
                                                            this.setEditValue(e.target.getAttribute('data-key'), 1)
                                                        else this.setEditValue(e.target.getAttribute('data-key'), 0)
                                                    }}
                                    /></td>;
                }else
                    s = <td key = {i}><input className = 'dovinputtable'
                                    type = 'text' 
                                    value = {this.state.datarow[this.props.tableHeader[i]['name_table']]}
                                    data-key = {this.props.tableHeader[i]['name_table']}                  
                                    onChange = {(e) => {this.setEditValue(e.target.getAttribute('data-key'), e.target.value)}}
                                    /></td>;

        return s;
    }

    render() {
        let str = []; 
        let str1 = []; 
        for (var i=0; i<this.props.tableHeader.length; i++)  { 
            if (this.state.selectRow === 1) {
                str[i] = this.RowCombo(i);
            } else 
            if (this.props.tableHeader[i]['type_col'] === 'log') {
                    str[i] = <td key = {this.props.tableHeader[i]['name_table']}><input type = 'checkbox' checked = {this.state.datarow[this.props.tableHeader[i]['name_table']]}
                    /></td>
            } else 
                str[i] = <td key = {this.props.tableHeader[i]['name_table']}>{this.state.datarow[this.props.tableHeader[i]['name_table']]}</td>;
        }
        let clbut = 0;
        for (i=0; i<this.props.dovbutton.length; i++)  { 
            if (this.props.dovbutton[i]['in_row'] === 1) {
                clbut++;
                str1[i] = <td key = {this.props.dovbutton[i]['id_button']}> 
                            <button value = {this.props.dovbutton[i]['name_button']} 
                                    data-key = {this.props.dovbutton[i]['id_button']}
                                    data-id = {this.props.index} 
                                    onClick = {(e) =>{ console.log('00000000');this.clickButton(e.target.getAttribute('data-key'), e.target.getAttribute('data-id'))} }
                                    >
                              {this.props.dovbutton[i]['name_button']}
                            </button></td>;
            }
        }
        let but = [];
        but[0] = <tr key = {this.props.index} 
                    data-key = {this.props.index}
                    onDoubleClick = {() => { this.setSelectRow()}} >
                    {str}{str1}
                </tr>;
        if (this.state.selectRow === 1) {
            but[1] = <tr key = {this.props.index}><td key = {1} colSpan = {this.props.tableHeader.length + clbut}>
                            <button onClick = {() => {this.saveEditValue()}}>Зберегти зміни</button>
                            <button onClick = {() => {this.unsaveEditValue()}}>Відмінити зміни</button>
                            <button onClick = {() => {this.deleteEditValue()}}>Видалити</button></td></tr>;
        }

        return <>{but}</>
    }
}
 
export default TableRow;