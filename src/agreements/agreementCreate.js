import React from "react";
import {
    useQueryWithStore,
    SimpleForm,
    Create,
    required,
    TextInput,
    NumberInput,
    DateInput,
    ReferenceInput,
    SelectInput,
    CheckboxGroupInput,
    ArrayInput,
    SimpleFormIterator,
} from "react-admin";
import { useMediaQuery, Button } from "@material-ui/core";
import { useLocation } from 'react-router';
import PostReferenceInput from './contactReferenceInput';

const today = new Date();

const paymentChange = (e) => {
    console.log(e.target.value)
    if (e.target.value === "MobilePaySubscription") {
        document.getElementById('MobilePaySubscription').style.display = 'block'
    }
    else {
        document.getElementById('MobilePaySubscription').style.display = 'none'
    }
    if (e.target.value === "MobilePayInvoice") {
        document.getElementById('MobilePayInvoice').style.display = 'block'
    }
    else {
        document.getElementById('MobilePayInvoice').style.display = 'none'
    }
}
const ConvertArrayToHTMLCollection = (children) => {
    var results = {};  // thid should be an object (collection)
    children.forEach((y) => {
        var name = y.getAttribute("name"); // if you really sure that all the matched elements have names
        results[name] = y;
    });
    return results;
};

export const AgreementCreate = (props) => {
    const AddInvoice = () => {
        const clonechildren = {}
        const htmlElements = document.getElementById('MobilePayInvoice').cloneNode(true)
        document.getElementById('MobilePayInvoice').lastChild.remove();
        console.log(htmlElements.children)
        for (const val of htmlElements.children) {
            console.log(val);
            document.getElementById('MobilePayInvoice').appendChild(val.cloneNode(true))
        }
    }
    const handleOneOff = (value) => {
        console.log(value.length)
        if (value.length > 0) {
            console.log(value.length)
            document.getElementById('mobilePaySubscriptionOneOffPaymentamount').parentElement.parentElement.style.display = 'block'
            document.getElementById('mobilePaySubscriptionOneOffPaymentdescription').parentElement.parentElement.style.display = 'block'
        } else {
            document.getElementById('mobilePaySubscriptionOneOffPaymentamount').parentElement.parentElement.style.display = 'none'
            document.getElementById('mobilePaySubscriptionOneOffPaymentdescription').parentElement.parentElement.style.display = 'none'
        }
    }
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <Create {...props}>
            <SimpleForm>
                <PostReferenceInput
                    source="contactId"
                    reference="agreements"
                    allowEmpty
                    validate={required()}
                />

                <TextInput source="description" label={'Beskrivelse'}></TextInput>

                <SelectInput source="paymentMethod" id="paymentMethod" onChange={paymentChange} label={'betaling metode'} choices={[
                    { id: 'MobilePaySubscription', name: 'MobilePay Subscription' },
                    { id: 'MobilePayInvoice', name: 'MobilePay Invoice' },
                ]} />
                <div id="MobilePaySubscription" style={{ display: 'none' }}>
                    <NumberInput source="mobilePaySubscriptionAgreement.amount" label="beløb" ></NumberInput>
                    <TextInput source="mobilePaySubscriptionAgreement.plan" label="Aftalenavn"></TextInput>
                    <SelectInput source="notificationMethod" label={'påmindelse metode'} choices={[
                        { id: 'SMS', name: 'SMS' },
                        { id: 'ingen', name: 'ingen' },
                    ]} />
                    <DateInput source="mobilePaySubscriptionAgreement.nextPaymentDate" label="Næste betalingsdato" ></DateInput>
                    <SelectInput source="mobilePaySubscriptionAgreement.frequency" label={'Frekvens'} choices={[
                        { id: '1', name: 'Årlig' },
                        { id: '2', name: 'Halvårlig' },
                        { id: '4', name: 'Kvartalsvis' },
                        { id: '12', name: 'Månedlig' },
                        { id: '26', name: 'Hveranden uge' },
                        { id: '52', name: 'Ugentlig' },
                        { id: '365 ', name: 'Daglig' },
                        { id: '0', name: 'Fleksibel' },
                    ]} />
                    <CheckboxGroupInput source="mobilePaySubscriptionAgreement.category" onChange={handleOneOff} label="" choices={[
                        { id: 'oneOffPayment', name: 'Engangsbetaling' },
                    ]} />
                    <NumberInput id="mobilePaySubscriptionOneOffPaymentamount" source="mobilePaySubscriptionAgreement.mobilePaySubscriptionOneOffPayment.amount" label="oneoff beløb" style={{ 'display': 'none' }}></NumberInput>
                    <TextInput id="mobilePaySubscriptionOneOffPaymentdescription" source="mobilePaySubscriptionAgreement.mobilePaySubscriptionOneOffPayment.description" label="oneoff Beskrivelse" style={{ 'display': 'none' }}></TextInput>
                </div>
                <div id="MobilePayInvoice" style={{ display: 'none' }}>
                    <SelectInput source="mobilePayInvoiceAgreement.type" label={'Invoice type'} choices={[
                        { id: 'InvoiceDirect', name: 'InvoiceDirect' },
                    ]} />
                    <DateInput source="mobilePayInvoiceAgreement.dueDate" label="Betalingsdato"></DateInput>
                    <TextInput source="mobilePayInvoiceAgreement.comment" label="kommentar"></TextInput>
                    <ArrayInput id="MobilePayInvoiceArray" source="mobilePayInvoiceAgreement.articles" label="Linjer">
                        <SimpleFormIterator>
                            <TextInput source="mobilePayInvoiceAgreement.articles.number" label="Kode"></TextInput>
                            <TextInput source="mobilePayInvoiceAgreement.articles.description" label="Beskrivelse"></TextInput>
                            <TextInput source="mobilePayInvoiceAgreement.articles.unit" label="Enhed" helperText="E.g stk, kg, liter"></TextInput>
                            <NumberInput source="mobilePayInvoiceAgreement.articles.quantity" label="Antal"></NumberInput>
                            <NumberInput source="mobilePayInvoiceAgreement.articles.pricePerUnit" label="Stykpris"></NumberInput>
                            <CheckboxGroupInput source="mobilePayInvoiceAgreement.articles.useVat" label="" choices={[
                                { id: 'useVat', name: 'Beregn moms' },
                            ]} />
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>
            </SimpleForm>
        </Create >
    );
};
