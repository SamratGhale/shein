import NavBar from './NavBar';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Footer from './Footer';
import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
DashBoardLayout.prototype = {
  children: PropTypes.node
}

function DashBoardLayout({ children }) {
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>

      <NavBar />
      <Outlet/>

      <Footer />
    </Box>
  )
}
export default DashBoardLayout;