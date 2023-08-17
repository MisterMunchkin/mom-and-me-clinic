import { Drawer, IconButton, List, ListItem, ListItemPrefix } from "@/utilities/material-tailwind-export";
import React from "react";
import { XMarkIcon, Square3Stack3DIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

interface BurgerMenuProps {
  showDrawer: boolean;
  setShowDrawer: (show: boolean) => void;
}

export default function BurgerMenu({showDrawer, setShowDrawer}: BurgerMenuProps) {
  const router = useRouter();

  const navigate = (nav: string): void => {
    router.push(nav);
    setShowDrawer(false);
  } 

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
          <ListItem
            onClick={() => navigate('#hero')}
          >
            <ListItemPrefix>
              <Square3Stack3DIcon 
                className="text-gray-650"
              />
            </ListItemPrefix>
            Home
          </ListItem>
          <ListItem
            onClick={() => navigate('/appointment')}
          >
            <ListItemPrefix>
              <Square3Stack3DIcon 
                className="text-gray-650"
              />
            </ListItemPrefix>
            Book Appointment
          </ListItem>
          <ListItem
            onClick={() => navigate('#services')}
          >
            <ListItemPrefix>
              <Square3Stack3DIcon 
                className="text-gray-650"
              />
            </ListItemPrefix>
            Browse Services
          </ListItem>
          <ListItem
            onClick={() => navigate('#doctors')}
          >
            <ListItemPrefix>
              <Square3Stack3DIcon 
                className="text-gray-650"
              />
            </ListItemPrefix>
            Our Doctors
          </ListItem>
          <ListItem
            onClick={() => navigate('#location')}
          >
            <ListItemPrefix>
              <Square3Stack3DIcon 
                className="text-gray-650"
              />
            </ListItemPrefix>
            Location
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  )
}