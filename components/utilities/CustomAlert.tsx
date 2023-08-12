import { AlertInterface, alertService } from "@/services/alert-service";
import { Alert } from "@/utilities/material-tailwind-export";
import { useEffect, useRef, useState } from "react";
import { ReplaySubject, takeUntil } from "rxjs";

export function CustomAlert() {
  const mounted = useRef(false);
  const [ alerts, setAlerts ] = useState<AlertInterface[]>([]);
  
  useEffect(() => {
    const destroy$ = new ReplaySubject<void>(1);
    mounted.current = true;
    
    alertService.alert$
      .pipe(
        takeUntil(destroy$)
      )
      .subscribe((alert: AlertInterface | void) => {
        // clear all alerts when emitted void
        if (!alert) {
          setAlerts([]);
          return;
        }

        setAlerts(alerts => ([...alerts ,alert]));
      });

      const clearAlerts = () => alertService.clear();

      return () => {
        mounted.current = false;
        destroy$.next();
        destroy$.complete();
        setAlerts([]);
      }
  }, []);

  const removeAlert = (alert: AlertInterface) => {
    if (!mounted.current) return;

    alert.open = false;
    setAlerts(alerts => alerts.filter(x => x.id !== alert.id));
  }

  return (
    <>
      {alerts.map((alert, index) =>
        <Alert
          key={index}
          className={`${alert.alertClass} text-gray-650
          w-full sm:w-96 sm:m-6
          border-0 rounded-lg px-4 py-2 fixed top-0 sm:top-auto sm:bottom-0 right-0`}
          open={alert.open}
          onClose={() => removeAlert(alert)}
          animate={{
            mount: { y: 0 },
            unmount: { y: -100 },
          }}
        >
          {alert.message}
        </Alert>
      )}
    </>
  );
}