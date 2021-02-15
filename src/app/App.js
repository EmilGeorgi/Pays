import * as React from "react";
import { Dashboard } from '../Layout/Dashboard';
import PostIcon from '@material-ui/icons/Book';
import { Admin, Resource, Logout, fetchUtils } from 'react-admin';
import { contactList, contactCreate, contactShow, contactEdit } from '../contact/index';
import { MerchantCreate, MerchantEdit, MerchantList } from '../merchants/index';
import ContactsIcon from '@material-ui/icons/Contacts';
import { AgreementList, AgreementCreate, AgreementShow, AgreementEdit } from '../agreements/index';
import { PaymentsList, PaymentCreate, PaymentShow, PaymentEdit } from '../payments/index';
import { NotificationsList } from '../notifications/index'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MyLayout from '../Layout/MyLayout';
import './App.css';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MailIcon from '@material-ui/icons/Mail';
import dataProvider from '../Dataprovider/dataProvider'
import CompositeDataProvider from '../Dataprovider/CompositeDataProvider';
import simpleRestProvider from 'ra-data-simple-rest';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import danishMessages from 'ra-language-danish';
import authProvider from '../Dataprovider/authProvider';
import { Route } from 'react-router-dom';

const i18nProvider = polyglotI18nProvider(() => danishMessages, 'da');

const fetchJson = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  // add your own headers here
  options.headers.set('X-Custom-Header', 'foobar');
  return fetchUtils.fetchJson(url, options);
}
const compositeDataProvider = new CompositeDataProvider([
  {
    dataProvider: dataProvider,
    resources: ["agreements", "payments", "contacts", "merchants", "notifications", "dawaAddresses", "user", "autocomplete"],
  },
  // {
  //   dataProvider: simpleRestProvider('https://dawa.aws.dk/', fetchJson, 'X-Total-Count'),
  //   resources: ["autocomplete"],
  // },
]);

const MyLogoutButton = props => <Logout {...props} icon={<ExitToAppRoundedIcon />} />;

const App = () => (
  <Admin disableTelemetry authProvider={authProvider} logoutButton={MyLogoutButton} layout={MyLayout} dashboard={Dashboard} dataProvider={compositeDataProvider} customRoutes={[
    <Route
      exact
      path="/MerchantEdit"
      id={global.select}
      resource="merchants"
      basePath="/merchants"
      component={props => {
        return (<MerchantEdit {...props} id={global.select}
          resource="merchants"
          basePath={`/`} />)
      }
      }
    />
  ]}>
    <Resource name="merchants" create={MerchantCreate} edit={MerchantEdit} list={MerchantList} options={{ label: 'Merchants' }} />
    <Resource name="agreements" edit={AgreementEdit} list={AgreementList} show={AgreementShow} create={AgreementCreate} icon={PostIcon} options={{ label: 'Aftaler' }} />
    <Resource name="contacts" list={contactList} show={contactShow} create={contactCreate} edit={contactEdit} icon={ContactsIcon} options={{ label: 'Kontakter' }} />
    <Resource name="payments" list={PaymentsList} show={PaymentShow} create={PaymentCreate} edit={PaymentEdit} icon={AssessmentIcon} options={{ label: 'Betalinger' }} />
    <Resource name="notifications" list={NotificationsList} options={{ label: 'Notifikationer' }} icon={MailIcon} />
    <Resource name="dawaAddresses" options={{ label: 'dawaAddresses' }} />
    <Resource name="autocomplete" options={{ label: 'dawa' }} />
  </Admin>

);
export default App;
