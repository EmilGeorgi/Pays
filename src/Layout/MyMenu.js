// in src/Menu.js
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DefaultIcon from '@material-ui/icons/ViewList';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import { MenuItemLink, getResources, usePermissions } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';
const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    text: {
        color: 'rgba(0, 0, 0, 0.54)',
    },
    bgImage: {
        backgroundImage: 'url(https://static.wixstatic.com/media/daa771_7af8fed8fcb44bbaa0fc7b2c60bba024~mv2_d_6011_3439_s_4_2.png/v1/fill/w_200,h_115,al_c,q_85,usm_0.66_1.00_0.01/Charity_Guard%20LOGO%202018.webp)',
        width: '100%',
        height: 65,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    },
    appBar: {
        margin: 0,
        width: '92%',
        float: 'left',
        backgroundColor: '#f0f0f0',
    },
    navStart: {
        // marginRight: '1.5rem',
    },
    spacer: {
        flex: 1,
    },
    navActive: {
        backgroundColor: 'rgba(220, 220, 220, 0.9)',
        color: 'black',
    },
});



const Menu = ({ onMenuClick, logout }) => {
    const { permissions } = usePermissions();
    const role = localStorage.getItem('permissions');
    const classes = useStyles();
    const handleClick = () => {
        setOpen(!open);
    };
    const HrefToMerchantEdit = () => {
        location.href += `merchants/${global.select}`
        location.reload();
    }
    const [open, setOpen] = React.useState(false);
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const resources = useSelector(getResources);
    return (
        <div className={classes.navStart}>
            <MenuItemLink
                to="/"
                primaryText="Dashboard"
                leftIcon={<DashboardRoundedIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                activeClassName={classes.navActive}
            />
            {resources.map(resource => (

                resource.options.label !== 'Indstillinger' ?
                    resource.options.label !== 'Merchants' ?
                        resource.options.label !== 'dawaAddresses' ?
                            <MenuItemLink
                                key={resource.name}
                                to={`/${resource.name}`}
                                primaryText={(resource.options && resource.options.label) || resource.name}
                                leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
                                onClick={onMenuClick}
                                sidebarIsOpen={open}
                                activeClassName={classes.navActive}
                            />
                            : ''
                        : ''
                    : ''
            ))}
            <div className={classes.text}>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Indstillinger'} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div">
                        <MenuItemLink
                            key={'merchantsEdit'}
                            to='/MerchantEdit'
                            primaryText={'Merchants indstillinger'}
                            onClick={onMenuClick}
                            sidebarIsOpen={open}
                            activeClassName={classes.navActive}
                        />
                        <MenuItemLink
                            key={'merchantsCreate'}
                            to={`/merchants/create`}
                            primaryText={'Merchants'}
                            onClick={onMenuClick}
                            sidebarIsOpen={open}
                            activeClassName={classes.navActive}
                        />
                        {/* {resources.map(resource => (
                            resource.options.label === 'Merchants' ?
                            !permissions ? console.log(permissions) : permissions.split(',').includes('pays_admin') === false ? '' :
                                <MenuItemLink
                                    key={resource.name}
                                    to={`/${resource.name}/create`}
                                    primaryText={(resource.options && resource.options.label) || resource.name}
                                    onClick={onMenuClick}
                                    sidebarIsOpen={open}
                                    activeClassName={classes.navActive}
                                /> :
                            resource.options.label !== 'Indstillinger' ? '' :
                                <MenuItemLink
                                    key={resource.name}
                                    to={`/${resource.name}`}
                                    primaryText={resource.name}
                                    onClick={onMenuClick}
                                    sidebarIsOpen={open}
                                    activeClassName={classes.navActive}
                                />
                        ))} */}
                    </List>
                </Collapse>
            </div>
            {isXSmall && logout}
        </div>
    );
};

export default Menu;