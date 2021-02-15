import * as React from "react";
import { Sidebar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useSidebarStyles = makeStyles({
    drawerPaper: {
        marginRight: '2rem'
    },
});

const MySidebar = props => {
    const classes = useSidebarStyles();
    return (
        <Sidebar className={classes.drawerPaper} {...props} />
    );
};

export default MySidebar;
