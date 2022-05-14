import NavBar from './NavBar';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Footer from './Footer';
import React, { useState } from "react";
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
      <div >{children} </div>

      <Footer />
    </Box>
  )
}
export default DashBoardLayout;