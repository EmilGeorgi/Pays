import * as React from "react";
import { TextInput, SimpleForm, Edit, required, ReferenceInput, SelectInput, SaveButton, Toolbar, usePermissions, DeleteButton } from 'react-admin';
import ServerAutoSuggest from '../agreements/server.autosuggest';
import DeleteButtonWithConfirmation from '../Layout/DeleteButtonWithConfirmation'

const ContactEditToolbar = (props, permissions) => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteButtonWithConfirmation />
    </Toolbar>
);

export const contactEdit = props => {
    const { permissions } = usePermissions();
    return (
        <Edit {...props}>
            <SimpleForm>
                    <TextInput source="content.firstName" label={"Fornavn"} validate={required()} />
                    <TextInput source="content.lastName" label={"Efternavn"} validate={required()} />
                    <TextInput source="content.phone" label={"Telefonnummer"} validate={required()} />
                    <TextInput source="content.email" label={"Email"} validate={required()} />
                    <TextInput source="content.address" label={"Adresse"} validate={required()} />
            </SimpleForm>
        </Edit>
    )
}