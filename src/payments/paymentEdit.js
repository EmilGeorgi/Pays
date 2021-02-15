import * as React from "react";
import { ReferenceInput, SelectInput, TextInput, Edit, SimpleForm, DeleteButton} from 'react-admin';

const PaymentTitle = ({ record }) => {
    return <span>Betaling {record ? `"${record.name}"` : ''}</span>;
};

const CustomDeleteButton = ({ type = 'Item', field, ...props }) => {
    const { record } = props;
    return (
        <DeleteButton
            confirmTitle={`Delete ${type}: ${field ? record[field] : 'this item'} ?`}
            confirmContent={'Er du sikker på du vil slette?'}
            {...props}
        />
    );
}

export default CustomDeleteButton;

export const PaymentEdit = props => (
<Edit title={<PaymentTitle />} {...props}>
    <SimpleForm>
        <ReferenceInput label="Kontakt" source="content.contactId" reference="contacts">
            <SelectInput optionText="content.phone" />
        </ReferenceInput>
        <TextInput source="content.amount" />
    </SimpleForm>
</Edit>
);