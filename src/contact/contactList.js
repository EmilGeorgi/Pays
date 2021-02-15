import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { SimpleList, EmailField, List, Datagrid, TextField, ShowButton, EditButton } from 'react-admin';

const postRowStyle = (record, index) => ({
    backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
});

export const contactList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <div>
            <List {...props}>
                {isSmall ? (
                    <SimpleList
                        primaryText={record => `Fornavn: ${record.content.firstName}`}
                        secondaryText={record => `Efternavn: ${record.content.lastName}`}
                        tertiaryText={record => `Telefonnummer: ${record.content.phone}`}
                        linkType={"show"}
                        rowStyle={postRowStyle}
                    />
                ) : (
                        <Datagrid rowClick="show">
                            <ShowButton label={'Åben'} />
                            <TextField source="content.phone" label="Telefonnummer" />
                            <TextField source="content.firstName" label="fornavn" />
                            <TextField source="content.lastName" label="Efternavn" />
                            <TextField source="versionDateTime" label="Oprettet" />
                        </Datagrid>
                    )}
            </List>
        </div>
    );
} 