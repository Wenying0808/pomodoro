import * as React from 'react';
import Button from '@mui/material/Button';
import { colors } from '../colors/colors';

export default function TextButton({label, onClick}) {
    return (
        <Button 
            style={{
                color: colors.RoyalBlue,
                fontSize: '12px',
                '&:hover':{
                    backgroundColor: colors.Zumtho
                }
            }}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};