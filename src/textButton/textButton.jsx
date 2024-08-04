import * as React from 'react';
import Button from '@mui/material/Button';
import { colors } from '../colors/colors';

export default function TextButton({label, onClick}) {
    return (
        <Button style={{
            color: colors.RoyalBlue,
            '&:hover':{
                backgroundColor: colors.Zumtho
            }
        }}>
            {label}
        </Button>
    );
};