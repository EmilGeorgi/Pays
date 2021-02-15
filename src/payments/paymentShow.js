import * as React from "react";
import { SimpleShowLayout, Show, TextField, ReferenceField, NumberField, DeleteButton, useGetOne } from 'react-admin';
import { Button } from "@material-ui/core";

const CustomDeleteButton = ({ type = 'Item', field, ...props }) => {
    const { record } = props;
    return (
        localStorage.getItem('permissions').split(',').includes('pays_admin') || localStorage.getItem('permissions').split(',').includes('pays_super_user') ?

            <DeleteButton
                confirmTitle={``}
                confirmContent={'Er du sikker på du vil slette?'}
                {...props}
            />
            :
            <></>
    );
}

export default CustomDeleteButton;

const refund = () => {
    const permissions = localStorage.getItem('permissions')
    permissions.split(',').includes('pays_admin') || permissions.split(',').includes('pays_super_user') ?
        fetch(`/api/payments/${location.toString().split('/')[5]}/refund`, { method: 'POST' }).then((value) => {
            if (value.status === 200) {
                alert('gensendt!')
            }
            else {
                alert('noget gik galt! ' + value.statusText)
                console.log(value)
            }
        })
        : alert('du har ikke tiladelse til denne handling')
}
const refresh = () => {
    const permissions = localStorage.getItem('permissions')
    permissions.split(',').includes('pays_admin') || permissions.split(',').includes('pays_super_user') ?
        fetch(`/api/payments/${location.toString().split('/')[5]}/refresh`, { method: 'POST' }).then((value) => {
            if (value.status === 200) {
                alert('gensendt!')
            }
            else {
                alert('noget gik galt! ' + value.statusText)
                console.log(value)
            }
        })
        : alert('du har ikke tiladelse til denne handling')
}
export const PaymentShow = (props) => {
    const { data, loaded } = useGetOne(props.resource, props.id);
    if (!loaded) return <span>Loading</span>; 
    console.log(data)
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <ReferenceField label="Kontakt" source="content.contactId" reference="contacts" link="show">
                    <TextField source="content.phone" />
                </ReferenceField>
                <ReferenceField label="Aftale" source="content.agreementId" reference="agreements" link="show">
                    <TextField source="content.description" />
                </ReferenceField>
                <NumberField source="content.amount" label={'Beløb'} />
                <TextField source="content.dueDate" label={'Næste betaling'} />
                <TextField source="state.state" label={'Status'} />
                <TextField source="versionDateTime" label={'Oprettet'} />
                <TextField source="content.organisation" label="Organisation" />
                <TextField source="content.kilde" label="Kilde" />
                {localStorage.getItem('permissions').split(',').includes('pays_admin') || localStorage.getItem('permissions').split(',').includes('pays_super_user') ?
                    data.content.paymentMethod === 'MobilePaySubscription' &&
                    <>
                        <Button style={{paddingTop: '30px'}} variant="contained" color="primary" onClick={refund}>
                            Refunder
                    </Button>
                        <Button variant="contained" style={{paddingTop: '30px'}} color="primary" onClick={refresh}>
                            Opdater
                    </Button>
                    </>
                    :
                    <>
                    </>
                }
                <CustomDeleteButton basePath="/payments" undoable={false} type="Payment" {...props} id="deleteButton" />

            </SimpleShowLayout>
        </Show>
    )
};