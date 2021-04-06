import React from 'react';

export default class ModalForm extends React.Component {

    state = {
        values : [],
        changes : []
    }

    setValues(index, val){
        let chk = 0;
        if (val === 0) {
            val = 1;
            chk = 1;
        } else {
            val = 0;
        };

        let arr = [...this.state.values];
        arr[index]['checkes'] = val;
        let arrchange = [...this.state.changes]
        arrchange[index] = chk;
        this.setState({values : arr, changes : arrchange});
    }

    closeModal(){
        this.props.closeModalForms();
    }

    setEditValue (j, i, data){
        console.log('----------setEditValue ['+j +']'+i+' = '+data);
        let arr = this.state.values;
        arr[j][i] = data;
        this.setState({values : arr});
    }

    saveValue(){
        console.log('save value table');
        console.log(this.state.values);
        let j = 0;
        let rd = [];
        let rdata = [];
        for (var i = 0; i < this.state.values.length; i++){
            if (this.state.values[i]['checkes'] === 1) {
                rd[j] = this.state.values[i]['id'];
                j++;
            }
        }
        
        for (var i = 0; i < this.state.values.length; i++){
            if ( this.state.values[i]['checkes'] === 1){
                rdata[i] = [];
                let t = 0;
                for (j = 0; j < this.props.refHeader.length; j++){
                    if (this.props.refHeader[j]['ins'] === 1) {
                        if (this.props.refCombo[this.props.refHeader[j]['name_table']]){
                            for (var k = 0; k < this.props.refCombo[this.props.refHeader[j]['name_table']].length; k++){
                                 if (this.props.refCombo[this.props.refHeader[j]['name_table']][k]['name_col'] === this.state.values[i][this.props.refHeader[j]['name_table']]){
                                    console.log('t = '+ t); 
                                    rdata[i][t] = [];
                                    console.log(rdata);
                                   rdata[i][t][0] = this.props.refHeader[j]['name_table'];
                                   rdata[i][t][1] = this.props.refCombo[this.props.refHeader[j]['name_table']][k]['id'];
                                   t++;
                                   // rdata[i][this.props.refHeader[j]['name_table']] = this.props.refCombo[this.props.refHeader[j]['name_table']][k]['id'];
                                }     
                            }
                        } else {
                            console.log('ttt = '+ t);
                            rdata[i][t] = [];
                            console.log(rdata);
                            rdata[i][t][0] = this.props.refHeader[j]['name_table'];
                            rdata[i][t][1] = this.state.values[i][this.props.refHeader[j]['name_table']];
                            t++;
                            //rdata[i][this.props.refHeader[j]['name_table']] = this.state.values[i][this.props.refHeader[j]['name_table']];
                            
                        }
                    }
                }
                
            }
        }

console.log('SAVE RDATA');
console.log(rdata);
console.log(this.props.selectDov);
console.log(this.props.refbut);
console.log( this.props.refid);
        this.props.setRefData(this.props.selectDov,this.props.refbut, rd, rdata, this.props.refid);
    }

    componentDidMount() {
        let arr = [];
        for(var i = 0; i< this.props.refData.length; i++){
            arr[i] = 0;
        }
console.log('array for changes');
console.log(arr);        
        this.setState({values : this.props.refData, changes : arr});
    }

    render (){
        console.log('render table');
        console.log(this.state);
        console.log(this.props);
        let str = [];
        let strbt = [];
        let stylecontainer = { width : '500px', height : (this.props.heightForm - 30), overflow : 'scroll'};
        let hdr = this.props.refHeader.map((a,index) => {if (a.name_col !== ''){return <th key = {index}>{a.name_col}</th> } });
        let thr = null;
        let dtr = null;
        if (typeof this.props.refData[0]['checkes'] !== 'undefined'){
            thr = <tr style = {{height : '40px'}} key = {-1}> <th key = {-1}></th> {hdr} </tr>;
        } else {
            thr = <tr key = {-1}> {hdr} </tr>;
        }
        dtr = this.state.values.map((a, index) => {
            let i = 0;
            let dd = [];
            for ( let k in a){
                if (k === 'checkes') {
                    dd[i] = <td key = {i}>  <input type = 'checkbox' name = 'checkvalue' value = {index} checked = {a[k]} onChange = {(e) => {this.setValues(index, a[k])}} /></td>; 
                } else  if (k !== 'id') { 
                    for(var j = 0; j < this.props.refHeader.length; j++){
                        if (this.props.refHeader[j]['name_table'] === k){
                            if (this.props.refHeader[j]['type_col'] === 'log'){
                                if (this.state.changes[index] === 0){
                                    dd[i] = <td key = {i}> 
                                                    <input type = 'checkbox' 
                                                                  data-key = {this.props.refHeader[j]['name_table']}                  
                                                                  checked = {a[k]}
                                                    />
                                            </td>;
                                } else {
                                    dd[i] = <td key = {i}>
                                                    <input type = 'checkbox' 
                                                                  data-key = {this.props.refHeader[j]['name_table']} 
                                                                  data-index = {index}                
                                                                  checked = {a[k]}
                                                                  onChange = {(e) => {console.log('changed id_brigadir');
                                                                  if (e.target.checked)
                                                                      this.setEditValue(e.target.getAttribute('data-index'), e.target.getAttribute('data-key'), 1)
                                                                  else this.setEditValue(e.target.getAttribute('data-index'), e.target.getAttribute('data-key'), 0)
                                                    }} />
                                    </td>;
                                }
                            }else{
                                if (this.state.changes[index] === 0 || this.props.refHeader[j]['ins'] === 0 ) {
                                    dd[i] = <td key = {i}>  {a[k]}  </td>;
                                } else {
console.log('++++++++++++++++');
console.log(this.props.refHeader[i]['name_table']);
console.log(this.props.refCombo[this.props.refHeader[i]['name_table']])                                    
                                    if (this.props.refCombo[this.props.refHeader[j]['name_table']]){
                                        dd[i] = <td key = {i}> 
                                                    <select 
                                                            value = {a[k]}
                                                            data-key = {this.props.refHeader[j]['name_table']}  
                                                            data-index = {index}                
                                                            onChange = {(e) => {this.setEditValue(e.target.getAttribute('data-index'), e.target.getAttribute('data-key'), e.target.value)}}
                                                    >
                                                        <option key = {-1} value = {-1}></option>
                                                        {this.props.refCombo[this.props.refHeader[j]['name_table']].map((a)=>{return <option key = {a.id} value = {a.name_col}>{a.name_col}</option>})}
                                                    </select>
                                                </td>;
                                    } else {
                                        dd[i] = <td key = {i}> 
                                                    <input type = 'text' 
                                                            value = {a[k]}
                                                            data-key = {this.props.refHeader[j]['name_table']}  
                                                            data-index = {index}                
                                                            onChange = {(e) => {this.setEditValue(e.target.getAttribute('data-index'), e.target.getAttribute('data-key'), e.target.value)}}
                                                    />
                                                </td>
                                    }
                                }
                            }
                        }
                    }
                }
                i++;
            }
            return <tr key = {index}> {dd} </tr>;
        });
        str = <table className='TableDespatch'> 
                {thr}
                {dtr}
              </table>;
        strbt = <p>
                  <button onClick = {() => {this.saveValue()}}>Зберегти</button>
                  <button onClick = {() => {this.closeModal()}}>Відмінити</button>
                </p>;
        return  <> 
                    <div className = "container" style = {stylecontainer}>{str}</div>
                    <div>{strbt}</div>
                </>
    }
} 