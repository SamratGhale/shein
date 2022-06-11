import React, {useState} from "react";
import {Icon} from "@iconify/react"
import { Button } from "@mui/material"
import chevronUpFill from "@iconify/icons-eva/chevron-up-fill";
import chevronDownFill from "@iconify/icons-eva/chevron-down-fill";


export default function ClothProductSort() {
const [open, setOpen] = useState(null);


const handleOpen = (event) => {
  setOpen(event.currentTarget);
}

    return (
      <Button
       color="inherit"
       disableRipple
       onClick={handleOpen}
       endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill }/>}>
        Sort By:&nbsp;
      </Button> 
    )
}