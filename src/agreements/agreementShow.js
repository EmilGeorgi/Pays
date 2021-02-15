import { Button } from "@material-ui/core";
import React from "react";
import {
  TabbedShowLayout,
  Show,
  TextField,
  Tab,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
  DateField,
  usePermissions
} from "react-admin";

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const MaterialUIPickers = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
  const handleDateChange = (date) => {
    setSelectedDate(date);
    nextScheduleDate();
  };
  const nextScheduleDate = () => {
    const permissions = localStorage.getItem('permissions')
    permissions.split(',').includes('pays_admin') || permissions.split(',').includes('pays_super_user') ?
      fetch(`/api/agreements/${location.toString().split('/')[5]}/mobilePaySubscription/nextScheduleDate`, { method: 'POST', body: formatDate(selectedDate) }).then((data) => {
        if (data.status === 200) {
          alert('næste dato sat til ' + selectedDate)
        }
        else {
          alert('noget gik galt! ' + data.statusText)
        }
      })
      : alert('du har ikke tiladelse til denne handling')
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="overskriv næste betalings dato"
          format="MM/dd/yyyy"
          onSubmit={nextScheduleDate}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

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
const resend = () => {
  const permissions = localStorage.getItem('permissions')
  permissions.split(',').includes('pays_admin') || permissions.split(',').includes('pays_super_user') ?
    fetch(`/api/agreements/${location.toString().split('/')[5]}/notifications/resend`, { method: 'POST' }).then((value) => {
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
    fetch(`/api/agreements/${location.toString().split('/')[5]}/refresh`, { method: 'POST' }).then((value) => {
      if (value.status === 200) {
        alert('opdateret!')
      }
      else {
        alert('noget gik galt! ' + value.statusText)
        console.log(value)
      }
    })
    : alert('du har ikke tiladelse til denne handling')
}

export const AgreementShow = (props) => {
  fetch(`/api/agreements/${props.id}`).then((val) => {
    return val.json();
  }).then((data) => {
    console.log(data)
    if (data.content.paymentMethod === 'MobilePayInvoice') {
      document.getElementById('mobilePayInvoiceAgreementFields').style.display = 'block';
      document.getElementById('MobilePaySubscriptionAgreementFields').style.display = 'none';
    }
    else if (data.content.paymentMethod === 'MobilePaySubscription') {
      document.getElementById('MobilePaySubscriptionAgreementFields').style.display = 'block';
      document.getElementById('mobilePayInvoiceAgreementFields').style.display = 'none';
    }
    if (data.content.notificationMethod) {
      document.getElementById('resend').style.display = 'block'
      document.getElementById('refresh').style.display = 'block'
    }
  })
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Aftale">
          <TextField label="beskrivelse" source="content.description" />
          <TextField label="betalings metode" id="paymentMethod" source="content.paymentMethod" />
          <div id="mobilePayInvoiceAgreementFields">
            <TextField label="næste betalings dato" source="content.mobilePayInvoiceAgreement.dueDate" />
            <TextField label="Invoic type" source="content.mobilePayInvoiceAgreement.type" />
          </div>
          <div id="MobilePaySubscriptionAgreementFields">
            <TextField label="Beløb" source="content.MobilePaySubscriptionAgreement.amount" />
            <TextField label="Aftalenavn" source="content.MobilePaySubscriptionAgreement.plan" />
            <TextField label="Næste betalingsdato" source="content.MobilePaySubscriptionAgreement.nextPaymentDate" />
            <TextField label="Frekvens" source="content.MobilePaySubscriptionAgreement.frequency" />
          </div>
          <DateField label="oprettet" source="versionDateTime" />
          <ReferenceField label="Kontakt" source="content.contactId" reference="contacts" link="show">
            <TextField source="content.phone" />
          </ReferenceField>
        </Tab>
        <Tab label="Betalinger" path="Payments">
          <MaterialUIPickers />
          <ReferenceManyField label="Betalinger" reference="payments" target="id">
            <Datagrid rowClick="show">
              <TextField source="content.description" label={'Aftalenavn'} />
              <TextField source="content.dueDate" label={'Næste betalingsdato'} />
              <TextField source="content.amount" label={'Beløb'} />
              <TextField source="content.paymentMethod" label={'Betalingsmetode'} />
              <DateField source="versionDateTime" label="Oprettet" />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab label="Notifikationer" path="notifications">
          {localStorage.getItem('permissions').split(',').includes('pays_admin') || localStorage.getItem('permissions').split(',').includes('pays_super_user') ?
            <>
              <Button variant="contained" color="primary" id="resend" style={{ display: 'none' }} onClick={resend}>
                resend
              </Button>
              <Button variant="contained" color="primary" id="refresh" style={{ display: 'none' }} onClick={refresh}>
                refresh
              </Button>
            </>
            :
            <>
            </>
          }
          <ReferenceManyField label="notifikation" reference="notifications" target="id">
            <Datagrid rowClick="show">
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
    </Show >
  )
}