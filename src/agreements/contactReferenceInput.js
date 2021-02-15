import React, { useState, useCallback } from 'react';
import { useFormState } from 'react-final-form';
import { ReferenceInput, AutocompleteInput } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import ContactQuickCreateButton from './contactQuickCreateButton';
import ContactQuickPreviewButton from './contactQuickPreviewButton';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        textAlign: 'end',
        justifyContent: 'space-between',
        width: '400px'
    }
});

const spySubscription = { values: true };

const PostReferenceInput = props => {
    const classes = useStyles();
    const [version, setVersion] = useState(0);
    const { values } = useFormState({ subscription: spySubscription });
    const handleChange = useCallback(() => setVersion(version + 1), [version]);
    console.log(values)
    return (
        <div>
            <div style={{ 'display': 'flex' }}>
                {!values.id && <ContactQuickCreateButton onChange={handleChange} />}
                {values.id && <ContactQuickPreviewButton id={values.id} />}
            </div>
            <div>
                <ReferenceInput
                    label={'telefon nummer'}
                    source="contactId"
                    reference="contacts">
                    <AutocompleteInput style={{ 'width': '100%' }} optionText="content.phone" optionValue="id" />
                </ReferenceInput>
            </div>
        </div>
    );
};

export default PostReferenceInput;
