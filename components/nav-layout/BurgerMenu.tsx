import { Drawer, IconButton, List, ListItem } from "@/utilities/material-tailwind-export";
import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface BurgerMenuProps {
  showDrawer: boolean;
  setShowDrawer: (show: boolean) => void;
}

export default function BurgerMenu({showDrawer, setShowDrawer}: BurgerMenuProps) {
  return (
    <React.Fragment>
      <Drawer
        className="h-screen"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <div
          className="mb-2 p-4"
        >
          <IconButton
            variant="text"
            className="text-gray-650 float-right"
            onClick={() => setShowDrawer(false)}
          >
            <XMarkIcon
              className="h-8 w-8"
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