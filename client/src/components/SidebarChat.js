import React from 'react'
import classes from "./SidebarChat.module.css"
import { Avatar } from '@mui/material'
const SidebarChat = () => {
  return (
    <div className={classes.sidebarChat}>

        <Avatar />
        <div className={classes.sidebarChat_info}>
            <h2>Room name</h2>
            <p>This is the last message</p>
        </div>
    </div>
  )
}

export default SidebarChat