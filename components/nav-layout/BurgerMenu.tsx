import { Drawer, IconButton, List, ListItem } from "@/utilities/material-tailwind-export";
import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface BurgerMenuProps {
  showDrawer: boolean;
  setShowDrawer: (show: boolean) => void;
}

const navItems = [
  {
    description: 'Home',
    link: '#hero'
  },
  {
    description: "Book Appointment",
    link: '/appointment'
  },
  {
    description: 'Browse Services',
    link: '#services'
  },
  {
    description: 'Our Doctors',
    link: '#doctors'
  },
  {
    description: 'Location',
    link: '#location'
  }
]

export default function BurgerMenu({showDrawer, setShowDrawer}: BurgerMenuProps) {
  return (
    <React.Fragment>
      <Drawer
        overlay={false}
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
          {navItems.map((navItem,index) => (
            <a
              key={index}
              href={navItem.link}
            >
              <ListItem>
                {navItem.description}
              </ListItem>
            </a>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  )
}