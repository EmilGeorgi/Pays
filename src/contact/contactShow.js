import * as React from 'react'
import { TabbedShowLayout, Tab, Show, ReferenceManyField, Datagrid, TextField, DateField, EditButton } from 'react-admin';
import DeleteButtonWithConfirmation from '../Layout/DeleteButtonWithConfirmation'

const ContactShowToolbar = props => (
    <Toolbar {...props} >
        <EditButton />
        <DeleteButtonWithConfirmation />
    </Toolbar>
);

export const contactShow = (props) => {
    return (
        <Show {...props}>
            <TabbedShowLayout>
                <Tab label="kontakt">
                    <TextField label="Fornavn" source="content.firstName" />
                    <TextField label="Efternavn" source="content.lastName" />
                    <TextField label="Telefonnummer" source="content.phone" />
                    <TextField label="Email" source="content.email" />
                    <DateField label="oprettet" source="versionDateTime" options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }} />
                    <TextField label="Adresse" source="content.address" />
                </Tab>
                <Tab label="Aftaler" path="agreements">
                    <ReferenceManyField label="Aftaler" reference="agreements" target="contactId">
                        <Datagrid rowClick="show">
                            <TextField source="content.description" label={'Aftalenavn'} />
                            <TextField source="content.paymentMethod" label={'Betalingsmetode'} />
                            <DateField source="versionDateTime" label="Oprettet" />
                            <TextField source="content.organisation" label="Organisation" />
                            <TextField source="content.kilde" label="Kilde" />
                        </Datagrid>
                    </ReferenceManyField>
                </Tab>
                <Tab label="Betalinger" path="payments">
                    <ReferenceManyField label="Betalinger" reference="payments" target="contactId">
                        <Datagrid rowClick="show">
                            <TextField source="content.description" label={'Aftalenavn'} />
                            <TextField source="content.dueDate" label={'Næste betalingsdato'} />
                            <TextField source="content.amount" label={'Beløb'} />
                            <TextField source="content.paymentMethod" label={'Betalingsmetode'} />
                            <DateField source="versionDateTime" label="Oprettet" />
                            <TextField source="content.organisation" label="Organisation" />
                            <TextField source="content.kilde" label="Kilde" />
                        </Datagrid>
                    </ReferenceManyField>
                </Tab>
                <Tab label="Notifikationer" path="notifications">
                    <ReferenceManyField label="Notifikationer" reference="notifications" target="contactId">
                        <Datagrid>
                            <TextField source="text" label={'Aftalenavn'} />
                            <TextField source="method" label={'Beskrivelse'} />
                            <TextField source="smsNotificationState" label={'Betalingsmetode'} />
                            <TextField source="versionTime" label="Oprettet" />
                            <TextField source="content.organisation" label="Organisation" />
                            <TextField source="content.kilde" label="Kilde" />
                        </Datagrid>
                    </ReferenceManyField>
                </Tab>
            </TabbedShowLayout>
        </Show>
    )
}