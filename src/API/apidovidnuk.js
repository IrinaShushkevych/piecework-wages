import * as axios from 'axios';

const instance = axios.create({ baseURL: 'http://sdelka/php/' });

export const dovidnukAPI = {
	getDovidnuk : (uid) => { return instance.get('dovidnuku.php?userid='+uid) },

	getSelectionConditions : (dovid, uid) => { return instance.get('dovidnuk_user_select.php?userid='+uid+'&dovid='+dovid) },

	getDovButtons : (dovid) => { return instance.get('dovidnuk_button.php?dovid='+dovid) },

	getTableHeader : (dovid, butid) => {
console.log("------API --  TableHeader-------");
console.log('dovidnuk_table.php?dovid='+dovid+'&butid='+butid);
		return instance.get('dovidnuk_table.php?dovid='+dovid+'&butid='+butid)},

	getTableData : (dovid, id, login) => {
		return instance.get('dovidnuk_data.php?dovid='+dovid+'&id='+id+'&userlogin='+login)
	},

	setUpdateTableRow : (id_dov, dataf, id_row) => { 
		instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		return instance.post('dovidnuk_ins_upd.php', {userroles : id_dov, datafields : dataf, id : id_row});
	},

	deleteRowDovidnuk : (id_dov, id_row) => {
		return instance.get('dovidnuk_del.php?dovid='+id_dov+'&id='+id_row);
	},

	getSelectButton : (id_dov, id_but) => {
		return instance.get('dovidnuk_select_button.php?id_dov='+id_dov+'&id_but='+id_but);
	},

	getSelectData : (paths, id_dov, id_but, id_row) => {
console.log('---------- API ---------');
console.log(paths);
console.log(id_dov);
console.log(id_but);
console.log(id_row);
console.log(paths+'?data_dov='+id_dov+'&data_but='+id_but+'&data_id='+id_row);
console.log('------------------------');
		return instance.get(paths+'?data_dov='+id_dov+'&data_but='+id_but+'&data_id='+id_row);
	},

	setSelectData : (id_dov, id_row, dataf, datac, id_but) => {
		console.log('API ------');
		console.log(datac);
		console.log(dataf);
		instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		
		return instance.post('dovidnuk_add_ref_data.php', {data_dov : id_dov, data_but : id_but, datafields : dataf, datacombo : datac, data_id : id_row});
	}
}