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
      {/* {open ? (
        <div 
          className={`${className} text-gray-650 w-96 m-3 sm:m-6
          border-0 rounded-lg px-6 py-4 fixed bottom-0 left-0 right-0`}
        >
          <span
            className="inline-block align-middle mr-8"
          >
            {message}
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => onClose()}
          >
            <span><XMarkIcon className="text-gray-650"></XMarkIcon></span>
          </button>
        </div>
      ) : null} */}

      <Alert
        className={`${className} w-96 m-3 sm:m-6
        border-0 rounded-lg px-6 py-4 fixed bottom-0 left-0 right-0`}
        open={open}
        onClose={() => onClose()}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        {message}
      </Alert>
    </>
  );
}