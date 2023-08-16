
'use client'

import { Drawer, IconButton, List, ListItem } from "@/utilities/material-tailwind-export";
import React from "react";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

export default function BurgerMenu() {
  const [ open, setOpen ] = useState(false);

  return (
    <React.Fragment>
      <IconButton
        variant="text"
        className="text-gray-650"
      >
        <Bars3Icon 
          className="h-8 w-8"
          onClick={() => setOpen(true)}
        />
      </IconButton>
      <Drawer
        className="h-screen"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div
          className="mb-2 p-4"
        >
          <IconButton
            variant="text"
            className="text-gray-650 float-right"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon
              className="h-5 w-5"
            />
          </IconButton>
        </div>
        <List>
          <ListItem>
            Test
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  )
}