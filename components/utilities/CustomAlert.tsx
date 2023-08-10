// import { Alert } from "@/components/material-tailwind-export/MaterialTailwindExport";
import { Alert } from "@/utilities/material-tailwind-export";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface CustomAlertProp {
  className?: string;
  message: string;
  open: boolean;
  onClose: () => void;
}

export function CustomAlert({className, message, open, onClose}: CustomAlertProp) {
  return (
    <>
      <Alert
        className={`${className} w-full sm:w-96 sm:m-6
        border-0 rounded-lg px-4 py-2 fixed top-0 sm:top-auto sm:bottom-0 right-0`}
        open={open}
        onClose={() => onClose()}
        animate={{
          mount: { y: 0 },
          unmount: { y: -100 },
        }}
      >
        {message}
      </Alert>
    </>
  );
}