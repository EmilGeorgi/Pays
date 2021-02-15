import * as React from 'react';
import { Layout } from 'react-admin';
import MyAppBar from './MyAppBar';
import MyMenu from './MyMenu';
import MySidebar from './MySideBar'

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} menu={MyMenu} sidebar={MySidebar} />;

export default MyLayout;