import * as React from "react";
import { TextInput, SimpleForm, Create, required } from 'react-admin';
import ServerAutoSuggest from '../agreements/server.autosuggest';

export const contactCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="firstName" label={"Fornavn"} validate={required()} />
            <TextInput source="lastName" label={"Efternavn"} validate={required()} />
            <div style={{'display': 'flex'}}>
                <div style={{ 'display': 'flex', 'alignItems': 'center', 'height': '47px', 'width': '46px', 'marginBottom': '4px', 'marginTop': '8px', 'border': '1px solid rgba(0, 0, 0, 0.42)', 'justifyContent': 'center' }}>
                    <label>+45</label>
                </div>
                <TextInput source="phone" label={"Telefonnummer"} validate={required()} />
            </div>
            <TextInput source="email" label={"Email"} validate={required()} />
            <ServerAutoSuggest id="dawaAdress" source="dawaAddressId" validate={required()} />
        </SimpleForm>
    </Create>
);