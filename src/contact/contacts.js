import * as React from "react";
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { MenuItemLink, SimpleList, getResources, SimpleShowLayout, Show, EmailField, List, Datagrid, UrlField, TextField, ShowButton, EditButton, ReferenceInput, SelectInput, TextInput, Edit, SimpleForm, Create } from 'react-admin';
import { useSelector } from 'react-redux';
import DefaultIcon from '@material-ui/icons/ViewList';


const useStyles = makeStyles({
    navDisplay: {
        marginTop: 20,
        display: 'flex',
        width: '100%',
        justifyContent: 'start'
    },
});

const Menu = ({ onMenuClick, logout }) => {
    const classes = useStyles();
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    return (
        <div className={classes.navDisplay}>
            {resources.map(resource => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={
                        (resource.options && resource.options.label) ||
                        resource.name
                    }
                    leftIcon={
                        resource.icon ? <resource.icon /> : <DefaultIcon />
                    }
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
        </div>
    );
};

export const UserList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <div>
            <Menu /> 
            <List {...props}>
                {isSmall ? (
                    <SimpleList
                        primaryText={record => record.name}
                        secondaryText={record => `${record.views} views`}
                        tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                    />
                ) : (
                    <Datagrid rowClick="show">
                        <TextField source="name" />
                        <EmailField source="email" />
                        <ShowButton />
                        <EditButton />
                    </Datagrid>
                )}
            </List>
        </div>
    );
}

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
           <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);

export const UserShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="phone" />
            <UrlField source="website" />
            <TextField source="company.name" />
        </SimpleShowLayout>
    </Show>
);