import React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { SelectInput } from 'react-admin';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


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
            <span className={classes.spacer} />
            
            <button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
                            type="button" aria-label="Справка"> 
                <span class="MuiIconButton-label">           
                    <InfoOutlinedIcon />
                </span>  
                <span class="MuiTouchRipple-root"></span>
            </button>
        </AppBar>
    );
};

export default MyAppBar;
