import * as React from "react";
import { ReferenceInput, SelectInput, TextInput, SimpleForm, Create } from 'react-admin';

export const PaymentCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="postId" reference="posts">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);