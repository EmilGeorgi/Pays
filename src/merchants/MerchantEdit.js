import React, { useState } from 'react';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {
    Edit,
    SimpleForm,
    NumberInput,
    TextInput,
    BooleanInput
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import mobilepayButton from '../layout/MobilePayButton.png';

class InvoiceSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const select = global.select
        let isOidcGrantsInvoice = true;
        fetch(`/api/merchants/${select}/mobilepay/oidcgrants`, { method: 'GET' })
            .then((data) => {
                return data.json();
            }).then((data) => {
                isOidcGrantsInvoice = !data.includes('invoice');
                const invoiceChildren = document.getElementById('invoiceForm').children
                console.log(invoiceChildren)
                for (const invoiceInput of invoiceChildren) {
                    invoiceInput.children[1].children[0].disabled = isOidcGrantsInvoice
                }
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
            });
    }

    componentWillUnmount() {
    }
    render() {
        return (
            <div id="invoiceForm" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%' }}>
                <TextInput source="content.mobilePayInvoiceSettings.invoiceIssuerName" style={{ width: '100%', marginBottom: '20px' }} label="Navn på betalingssted" />
                <NumberInput source="content.mobilePayInvoiceSettings.vatRate" style={{ width: '100%', marginBottom: '20px' }} label="Momssats" helperText="et nummer mellem 0 til 1" />
            </div>
        )
    }
}

class SubscriptionsSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const select = global.select
        let isOidcGrantsSubscriptions = true;
        fetch(`/api/merchants/${select}/mobilepay/oidcgrants`, { method: 'GET' })
            .then((data) => {
                return data.json();
            }).then((data) => {
                isOidcGrantsSubscriptions = !data.includes('subscriptions');
                const subscriptionChildren = document.getElementById('formSub').children
                console.log(subscriptionChildren)
                console.log(data)
                for (const subscriptionInput of subscriptionChildren) {
                    subscriptionInput.children[1].children[0].disabled = isOidcGrantsSubscriptions
                    console.log(subscriptionInput.children[1].children[0])
                }
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
            });
    }

    componentWillUnmount() {
    }
    render() {
        return (
            <div id="formSub">
                <TextInput style={{ marginBottom: '20px' }} source="content.mobilePaySubscriptionSettings.subscriptionProviderName" label="Navn på betalingssted" />
                <TextInput style={{ marginBottom: '20px' }} source="content.mobilePaySubscriptionSettings.agreementUserRedirect" label="Godkend-redirect" />
                <TextInput style={{ marginBottom: '20px' }} source="content.mobilePaySubscriptionSettings.oneOffPaymentUserRedirect" label="one off Godkend-redirect" />
                <TextInput style={{ marginBottom: '20px' }} source="content.mobilePaySubscriptionSettings.agreementCancelRedirect" label="Annuller-redirect" />
                <NumberInput style={{ marginBottom: '20px' }} source="content.mobilePaySubscriptionSettings.expirationTimeoutMinutes" label="Timeout for aftale (minutter)" />
                <NumberInput style={{ marginBottom: '20px' }} source="content.mobilePaySubscriptionSettings.expirationTimeoutMinutesOneOff" label="Timeout for engangsbetalinger (minutter)" />
                <NumberInput style={{ marginBottom: '20px' }} source="content.mobilePaySubscriptionSettings.retentionPeriodHours" label="Fastholdelse før opsigelse (timer)" />
                <BooleanInput label="Notifikationer" source="content.mobilePaySubscriptionSettings.notificationsOn" />
                <NumberInput style={{ marginBottom: '20px' }} source="content.mobilePaySubscriptionSettings.schedulePaymentsInAdvanceDays" label="Anlæg betalinger før betalingsdato (dage)" />
                <NumberInput style={{ marginBottom: '20px' }} source="content.mobilePaySubscriptionSettings.paymentGracePeriodDays" label="Gentag fejlslagne betalinger (dage)" />
                <TextInput style={{ marginBottom: '20px' }} source="content.mobilePaySubscriptionSettings.charSet" label="SMS-Skabelon" />
                <TextInput style={{ marginBottom: '20px' }} source="content.mobilePaySubscriptionSettings.template" label="Encoding" />
                <NumberInput source="content.mobilePaySubscriptionSettings.vatRate" style={{ width: '100%', marginBottom: '20px' }} label="Momssats" helperText="et nummer mellem 0 til 1" />
            </div>
        )
    }
}

const useStyles = makeStyles((theme) => ({
    MobilepayContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    SaveButton: {
        display: 'block !important'
    }

}));

export const MerchantEdit = (props) => {
    !global.select ? location.replace(location.origin) : ''


    const classes = useStyles();
    const [showDialog, setShowDialog] = useState(false);
    const handleClick = () => {
        setShowDialog(true);
    };
    const handleCloseClick = () => {
        setShowDialog(false);
    };

    const handlesubmit = async values => {
        const formValues = values.target.parentNode.parentNode.children[1].children[0]
        location.replace(`/mobilepay/authenticate/${global.select}?clientId=${formValues[0].value}&clientSecret=${formValues[1].value}&merchantVat=${formValues[2].value}`)
    };
    return (
        <div {...props}>
            <div className={classes.MobilepayContainer}>
                <img src={mobilepayButton} onClick={handleClick} style={{ margin: '40px 0', cursor: 'pointer' }} />
                <Dialog
                    fullWidth
                    open={showDialog}
                    onClose={handleCloseClick}
                    aria-label="Start MobilePay Authorization">
                    <DialogTitle>Start MobilePay Authorization</DialogTitle>
                    <DialogContent>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField id="clientId" label="Mobilepay client id" variant="filled" />
                            <TextField id="ClientSecret" label="Mobilepay Client Secret" variant="filled" />
                            <TextField id="VAT" label="CVR nummer" variant="filled" />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={handleCloseClick}>
                            <IconCancel />
                        </Button>
                        <Button variant="contained" color="primary" onClick={handlesubmit}>
                            fortsæt
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Edit {...props}>
                <SimpleForm>
                    <Paper elevation={3} style={{ marginBottom: '40px', width: '100%' }}>
                        <Typography variant="h5">Merchant navn</Typography>
                        <TextInput style={{ marginBottom: '20px' }} source="content.name" label="Merchant Navn" />
                    </Paper>
                    <Paper elevation={3} style={{ marginBottom: '40px', width: '100%' }}>
                        <Typography variant="h5">MobilePay Subscription Settings</Typography>
                        <SubscriptionsSettings {...props} />
                    </Paper>
                    <Paper elevation={3} style={{ width: '100%' }}>
                        <Typography style={{ padding: '10px 10px' }} variant="h5">MobilePay Invoice Settings</Typography>
                        <InvoiceSettings {...props} />
                    </Paper>
                </SimpleForm>
            </Edit>
        </div >
    );
}