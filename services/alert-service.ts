import { ReplaySubject, defer } from "rxjs";

export interface AlertInterface {
  id: number;
  message: string;
  alertClass: string;
  open: boolean;
}

const alertClass = {
  Success: 'bg-green-500',
  Error: 'bg-red-500',
  Info: 'bg-white-coffee',
  Warning: 'bg-amber-500'
}

const alert$ = defer(() => alertSubject.asObservable());

const alertSubject = new ReplaySubject<AlertInterface | void>(1);

const warning = (message: string) => {
  alert(message, alertClass.Warning);
}

const alert = (message: string, alertClass: string) => {
  alertSubject.next({
    id: Math.random(),
    message: message,
    alertClass: alertClass,
    open: true
  });
}

const clear = () => {
  alertSubject.next();
}

export const alertService = {
  alert$,
  warning,
  clear
}