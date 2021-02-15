import * as React from "react";
import { TextInput, SimpleForm, Create, required, usePermissions } from 'react-admin';

export const MerchantCreate = props => {
    const role = localStorage.getItem('permissions');
    console.log(role.split(',').includes('pays_admin'))
    if (!role.split(',').includes('pays_admin')) {
        alert('du har ikke adgang til denne side')
        location.href = '/'
    }
    else {
        return (
            <Create {...props}>
                <SimpleForm>
                    <div style={{ 'display': 'flex', 'textAlign': 'center', 'justifyContent': 'space-between', 'margin': '0 7rem', 'width': '26%' }}>
                        <label style={{ 'alignSelf': 'center' }}>Merchants navn</label>
                        <TextInput source="name" label={'Merchants navn'} validate={required()} />
                    </div>
                </SimpleForm>
            </Create>
        )
    }
}