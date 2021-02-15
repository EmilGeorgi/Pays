import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { DateInput, List, Datagrid, SimpleList, TextField, ReferenceField, ShowButton, Filter, ReferenceInput, SelectInput, TextInput, SimpleForm, EmailField, NumberField } from 'react-admin';


export const NotificationsList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <div>
            <List {...props}>
                {isSmall ? (
                    <SimpleList
                        primaryText={record => record.subscriber_phone}
                        secondaryText={record => `${record.status}`}
                        tertiaryText={record => new Date(record.due_date).toLocaleDateString()}
                    />
                ) : (
                    <Datagrid rowClick="show">
                        <NumberField source="amount" label={'BELØB'} />
                        <TextField source="description" label={'BESKRIVELSE'} />
                    </Datagrid>
                )}
            </List>
        </div>
    );
}