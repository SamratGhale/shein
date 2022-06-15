import NavBar from './NavBar';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Footer from './Footer';
import { Breadcrumbs } from '@mui/material';
import { Link } from '@mui/material';
import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import AB from "../ab.png";


DashBoardLayout.prototype = {
  children: PropTypes.node
}

function DashBoardLayout() {
  console.log(window.location.pathname)
  const paths = window.location.pathname.split('/')
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',

      }}>
      <img src={AB} />
      <NavBar />
      <Box sx={{ padding: 3 }}>
        {paths[paths.length - 1] !== "" ? (
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            {paths.slice(1).map((p) => {
              return (
                <Link key={p} underline="hover" color="inherit" >
                  {p}
                </Link>
              )
            })}
          </Breadcrumbs>
        ) : ("")}

      </Box>
      <Outlet />
      <Footer />
    </Box>
  )
}
export default DashBoardLayout;