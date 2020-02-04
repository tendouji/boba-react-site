import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const BobaTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#9F9E99',
        },
        '& .MuiInput-underline:before': {
            border: '0',
        },
        '& .MuiInput-underline:hover:before': {
            border: '0',
        },
        '& .MuiInput-underline:after': {
            border: '0',
            // borderBottomColor: '#FD7162',
        },
    },
})(TextField);

type IconTextFieldProps = {
    label: string,
    Icon: any,
    value?: string,
    type?: string,
    id?: string,
    ref?: React.RefObject<any>,
    onChange?: () => void,
    onFocus?: () => void,
    onBlur?: () => void,
};

const IconTextField: React.FC<IconTextFieldProps> = React.forwardRef(({
       label,
       Icon,
       value,
       type='text',
       id,
       onChange,
       onFocus,
       onBlur
    }, ref) => {
    return (
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <Icon />
            </Grid>
            <Grid item>
                <BobaTextField
                    id={id}
                    label={label}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    inputRef={ref}
                />
            </Grid>
        </Grid>
    );
});

export default IconTextField;


