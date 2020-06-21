import React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { SelectInput } from 'react-admin';
import ShopSelector from '../shopSelector/ShopSelector';
import EmployeeInfo from './EmployeeInfo';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

const MyAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <EmployeeInfo/>
            <ShopSelector/>
            <span className={classes.spacer} />
            
            <IconButton  href="/#/info" color="inherit">
                <InfoOutlinedIcon/>
            </IconButton>
        </AppBar>
    );
};

export default MyAppBar;
