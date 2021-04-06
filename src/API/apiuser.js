import * as axios from 'axios';

const instance = axios.create({
	baseURL: 'http://sdelka/php/'
//	withCredentials : true 
});

export const userAPI = {
	getUsers : (ul, up) => { return instance.get('user_connect.php?userlogin='+ul+'&userpassword='+up) },
	
	getUserRoles : (id) => { return instance.get('user_role.php?userid='+id)}
}