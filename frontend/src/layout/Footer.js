import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { Link } from '@mui/material';
import CD from "../cd.png";
import Esewa from "../esewa.png"
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Grid, Stack } from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Grid container sx={{ backgroundColor: "white", border: 1 }}>
      <Grid item xs={12} sx={{ mb: 6 }}>
        <Grid container sx={{ alignItems: "center", justifyContent: "center", padding: 5 }} gap={90}>
          <Grid item>
            <Stack spacing={3}>
              <Typography variant="h6">Payment Methods</Typography>
              <Stack direction="row" gap={5}>
                <img src={CD} style={{ maxWidth: 100 }}></img>
                <img src={Esewa} style={{ maxWidth: 100 }}></img>
              </Stack>
            </Stack>
          </Grid>
          <Grid item>
            <Stack spacing={3}>
              <Typography variant="h6">Follow Us</Typography>
              <Stack direction="row" gap={3}>
                <FacebookIcon color="primary" />
                <a target="_blank" href="https://www.instagram.com/hive_press/">
                  <InstagramIcon color="secondary" />
                </a>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container sx={{ alignItems: "center", justifyContent: "center", backgroundColor: "#bfbdb8" }} spacing={2} gap={25}>
          <Grid item sx={{ mb: 2 }}>
            <Typography variant="body2">
              <CopyrightIcon sx={{ maxHeight: 15 }} />2022 Shophalic 24/7 All Rights Reserved
            </Typography>
          </Grid>
          <Grid item sx={{ mb: 2 }}>
            <Stack direction="row" gap={3} >
              <Typography variant='caption' sx={{ textDecoration: "underline" }}>
                Privacy Center
              </Typography>
              <Typography variant='caption' sx={{ textDecoration: "underline" }}>
                Privacy & Cookie Policy
              </Typography>
              <Typography variant='caption' sx={{ textDecoration: "underline" }}>
                Terms & Conditions
              </Typography>
              <Typography variant='caption' sx={{ textDecoration: "underline" }}>
                Copyright Notice
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Footer;