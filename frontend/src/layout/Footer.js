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
import MediaQuery from 'react-responsive';

const Footer = () => {
  return (

    <>

      <MediaQuery minWidth={450}>
        <Grid container sx={{ backgroundColor: "white", borderTop: 2 }}>
          <Grid item xs={12} sx={{ mb: 6 }}>
            <Grid container sx={{ justifyContent: "space-evenly", alignItems: "center", padding: 5 }} >
              <Grid item >
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
                    <a target="_blank" href="">
                      <FacebookIcon color="primary" fontSize='large' />
                    </a>
                    <a target="_blank" href="https://www.instagram.com/hive_press/">
                      <InstagramIcon color="secondary" fontSize='large' />
                    </a>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{ alignItems: "center", justifyContent: "center", backgroundColor: "#bfbdb8" }} spacing={2} >
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
      </MediaQuery>


      <MediaQuery maxWidth={449}>
        <Grid container sx={{ backgroundColor: "white", borderTop: 2 }}>
          <Grid item xs={12} sx={{ mb: 6 }}>
            <Grid container sx={{ justifyContent: "space-evenly", alignItems: "center", padding: 5 }} >
              <Grid item xs={6}>
                <Stack spacing={3} direction="column">
                  <Typography variant="h6">Payment Methods</Typography>
                  <Stack direction="column" gap={5}>
                    <img src={CD} style={{ maxWidth: 100 }}></img>
                    <img src={Esewa} style={{ maxWidth: 100 }}></img>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={3} direction="column">
                  <Typography variant="h6">Follow Us</Typography>
                  <Stack direction="column" gap={3} sx={{ justifyContent: "center" }}>
                    <a target="_blank" href="">
                      <FacebookIcon color="primary" fontSize="large" />
                    </a>
                    <a target="_blank" href="https://www.instagram.com/hive_press/">
                      <InstagramIcon color="secondary" fontSize='large' />
                    </a>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{ alignItems: "center", justifyContent: "center", backgroundColor: "#bfbdb8" }} spacing={2} >
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
      </MediaQuery>

    </>
  )
}
export default Footer;