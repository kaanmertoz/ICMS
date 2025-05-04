import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
} from '@mui/material';

export const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    Insurance CMS
                </Typography>
            </Toolbar>
        </AppBar>
    );
}; 