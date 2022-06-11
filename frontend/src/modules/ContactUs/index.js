import React from 'react'
import { Grid, Typography, Stack } from "@mui/material";
import BG from "../../bgweb.jpg"

const ContactUs = () => {
    return (
        <Grid container sx={{ alignItems: "center", justifyContent: "center", padding: 12, backgroundImage: `url(${BG})`, backgroundRepeat: "no-repeat", backgroundSize: "100%" }}>
            <Grid item>
                <Grid container spacing={3} sx={{
                    padding: 6,
                    backgroundColor: "white", alignItems: "center", justifyContent: "center", maxWidth: 1200, width: 1200
                }}>
                    < Grid item xs={5} >
                        <Typography variant="h3" sx={{ fontFamily: "Nunito" }}>Shophalic 24/7</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ fontFamily: "Nunito" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography><br />
                        <Typography variant="body2" sx={{ fontFamily: "Nunito" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography><br />
                        <Typography variant="body2" sx={{ fontFamily: "Nunito" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography><br />
                        <Typography variant="body2" sx={{ fontFamily: "Nunito" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography><br />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Contact Us
                        </Typography>
                        <Stack direction="row" sx={{ alignItems: "center" }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Email : </Typography>
                            <Typography variant="body1"> Shophalic24/7@gmail.com </Typography>
                        </Stack>
                        <Stack direction="row" sx={{ alignItems: "center" }}>
                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Phone No :</Typography>
                            <Typography variant="body1"> 98410232422 </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid >
        </Grid >
    )
}

export default ContactUs;