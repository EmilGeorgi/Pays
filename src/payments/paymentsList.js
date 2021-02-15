import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { DateInput, List, Datagrid, SimpleList, TextField, ReferenceField, ShowButton, Filter, ReferenceInput, SelectInput, TextInput, SimpleForm, EmailField, NumberField } from 'react-admin';

const PaymentFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="postId" reference="posts" allowEmpty>
            <SelectInput optionText="title" />
        </ReferenceInput>
        <SimpleForm label="Date" allowEmpty>
            <DateInput source="from date" />
            <DateInput source="to date" />
        </SimpleForm>
    </Filter>
);
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('');
}
const postRowStyle = (record, index) => ({
    backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
});
export const PaymentsList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <div>
            <List {...props}>
                {isSmall ? (
                    <SimpleList
                        primaryText={record => `Betalingsmetode: ${record.state.paymentMethod}`}
                        secondaryText={record => `Status: ${record.state.state}`}
                        tertiaryText={record => `Oprettet: ${record.versionDateTime}`}
                        linkType={"show"}
                        rowStyle={postRowStyle}
                    />
                ) : (
                        <Datagrid rowClick="show">
                            <ShowButton />
                            <ReferenceField label="Kontakt" source="content.contactId" reference="contacts" link="show">
                                <TextField source="content.phone" />
                            </ReferenceField>
                            <NumberField source="content.amount" label={'Beløb'} />
                            <TextField source="content.dueDate" label={'Næste betaling'} />
                            <TextField source="state.state" label={'Status'} />
                            <TextField source="versionDateTime" label={'Oprettet'} />
                            <TextField source="content.organisation" label="Organisation" />
                            <TextField source="content.kilde" label="Kilde" />
                        </Datagrid>
                    )}
            </List>
        </div>
    );
}