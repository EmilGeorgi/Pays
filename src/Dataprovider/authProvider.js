import { useDispatch } from 'react-redux';
import { AuthProvider, useNotify, useRedirect, fetchStart, fetchEnd } from 'react-admin';

const authProvider = {
    login: () =>  {
        try {
            fetch(`api/user/groups`, { method: 'GET' })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                localStorage.setItem('permissions', data);
            })
            .catch((e) => {
                console.log(e)
            })
            return Promise.resolve();
        } 
        catch (error) {
            return Promise.reject(error);
        }
    },
    checkError: (error) => { 
        return Promise.resolve();
    },
    checkAuth: () => {
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('permissions');
        location.href = `${location.origin}/logout`
    },
    getIdentity: () => {
        try {
            fetch(`api/user/groups`, { method: 'GET' })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                localStorage.setItem('permissions', data);
            })
            .catch((e) => {
                console.log(e)
            })
            return Promise.resolve();
        } 
        catch (error) {
            return Promise.reject(error);
        }
    },
    // authorization
    getPermissions: (params) => { 
        const role = localStorage.getItem('permissions');
        if(role) {
            return Promise.resolve(role.split(',').includes('pays_admin'));
        }
        else {
            return Promise.reject()
        }
    },
}

export default authProvider;