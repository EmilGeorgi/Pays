import React, { useState } from 'react';
import { useForm } from 'react-final-form';
import {
    NumberInput,
    required,
    Button,
    SaveButton,
    TextInput,
    useCreate,
    useNotify,
    FormWithRedirect,
    ReferenceInput,
    AutocompleteInput
} from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ServerAutoSuggest from './server.autosuggest';
import AutocompleteArrayInput from './AutocompleteArrayInput'
import { withStyles } from '@material-ui/core';

const AutocompleteInputInDialog = withStyles({
    suggestionsContainer: { zIndex: 2000 },
})(AutocompleteInput);
export const ContactQuickCreateButton = ({ onChange }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [create, { loading }] = useCreate('contacts');
    const notify = useNotify();
    const form = useForm();
    const handleClick = () => {
        setShowDialog(true);
    };
    const handleCloseClick = () => {
        setShowDialog(false);
    };

    const handleSubmit = async values => {
        create(
            { payload: { data: values } },
            {
                onSuccess: ({ data }) => {
                    setShowDialog(false);
                    form.change('id', data.id);
                    onChange();
                },
                onFailure: ({ error }) => {
                    notify(error.message, 'error');
                }
            }
        );
    };
    return (
        <>
            <Button onClick={handleClick} label="opret kontakt">
                <IconContentAdd />
            </Button>
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleCloseClick}
                aria-label="Opret kontakt"
            >
                <DialogTitle>Opret kontakt</DialogTitle>

                <FormWithRedirect
                    resource="contacts"
                    save={handleSubmit}
                    render={({
                        handleSubmitWithRedirect,
                        pristine,
                        saving
                    }) => (
                        <>
                            <DialogContent style={{ 'display': 'flex', 'flexWrap': 'wrap', 'justifyContent': 'space-around' }}>
                                <TextInput source="firstName" label={"Fornavn"} validate={required()} />
                                <TextInput source="lastName" label={"Efternavn"} validate={required()} />
                                <div style={{ 'display': 'flex' }}>
                                    <div style={{ 'display': 'flex', 'alignItems': 'center', 'height': '47px', 'width': '46px', 'marginBottom': '4px', 'marginTop': '8px', 'border': '1px solid rgba(0, 0, 0, 0.42)', 'justifyContent': 'center' }}>
                                        <label>+45</label>
                                    </div>
                                    <TextInput source="phone" label={"Telefonnummer"} validate={required()} />
                                </div>
                                <TextInput style={{ 'width': '100%' }} source="email" label={"Email"} validate={required()} />
                                <ReferenceInput
                                    source="dawaAddress"
                                    reference="autocomplete"
                                    label="addresse"
                                    fullWidth={true}>
                                    <AutocompleteInputInDialog optionText="tekst" optionValue="id" />
                                </ReferenceInput>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleCloseClick}
                                    disabled={loading}
                                >
                                    <IconCancel />
                                </Button>
                                <SaveButton
                                    handleSubmitWithRedirect={
                                        handleSubmitWithRedirect
                                    }
                                    pristine={pristine}
                                    saving={saving}
                                    disabled={loading}
                                />
                            </DialogActions>
                        </>
                    )}
                />
            </Dialog>
        </>
    );
}
export default ContactQuickCreateButton;
