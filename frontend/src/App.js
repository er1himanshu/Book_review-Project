import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Box, CssBaseline } from '@mui/material';
import BookList from './BookList';
import BookDetail from './BookDetail'; 

function App() {
    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* AppBar/Header */}
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Book Review System App
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3 }}
                >
                    <Toolbar /> 
                    <Container>
                        {/* App Routes */}
                        <Routes>
                            <Route path="/" element={<BookList />} />
                            <Route path="/books/:id" element={<BookDetail />} /> 
                        </Routes>
                    </Container>
                </Box>
            </Box>
        </Router>
    );
}

export default App;
