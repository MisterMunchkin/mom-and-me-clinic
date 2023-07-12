import { PersonalDetailsMTFormInterface } from "@/interfaces/appointment";
import * as yup from "yup";
import "yup-phone-lite";
import { Button } from "./../material-tailwind-export/MaterialTailwindExport";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { isDate, differenceInYears } from "date-fns";

interface PersonalDetailsForm {
  handleFormSubmit: (personalDetails: PersonalDetailsMTFormInterface) => void;
}

const genders = ['Male', 'Female', 'Others'];

const personalDetailsFormSchema: yup.ObjectSchema<PersonalDetailsMTFormInterface> = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .test('maxChar', 'Must not exceed 40 characters', val => val.length <= 41),
  middleName: yup
    .string()
    .test('maxChar', 'Must not exceed 40 characters', val => val === undefined || val.length <= 41),
  lastName: yup
    .string()
    .required('Last name is required')
    .test('maxChar', 'Must not exceed 40 characters', val => val.length <= 41),
  dateOfBirth: yup.object().shape({
    day: yup
      .number()
      .required(),
    month: yup
      .number()
      .required(),
    year: yup
      .number()
      .required()
  })
  .test('validDate', 'Date of birth is an invalid date', val => {
    const { day, month, year } = val;
    if (!day || !month || !year) { //all 3 must not be null or empty
      return false;
    }
    
    if (day < 1 || day > 31) { //day must be between 1 to 31
      return false;
    }
    if (month < 1 || month > 12) { //month must be between 1 to 12
      return false;
    }
    if (year < 1990) {//year must not be lesser than 1990
      return false;
    }

    //age must not be lesser than 1 year old
    const dateValue = new Date(year, month - 1, day);
    const currentDate = new Date();
    const validMinimumAge = differenceInYears(currentDate, dateValue) >= 1;
    if (!validMinimumAge) {
      return false;
    }

    //must be a valid date
    return isDate(dateValue);
  }),
  phoneNumber: yup
    .string()
    .phone("PH", "Must be a valid Philippine phone number")
    .required("Phone number is required"),
  sex: yup
    .string()
    .required("Gender is required")
    .oneOf(genders),
  medicalConcern: yup
    .string()
    .required("Medical concern is required"),
  honeyPotEmail: yup
    .string()
});

export default function PersonalDetailsForm({handleFormSubmit}: PersonalDetailsForm) {

  const {
    register: registerPersonalDetails,
    handleSubmit: handleSubmitPersonalDetails,
    formState: { errors: errorsPersonalDetails},
    reset: resetPersonalDetails
  } = useForm<PersonalDetailsMTFormInterface>({
    resolver: yupResolver(personalDetailsFormSchema),
  });

  const submit: SubmitHandler<PersonalDetailsMTFormInterface> = async (personalDetails) => {
    const isValid = await personalDetailsFormSchema.isValid(personalDetails);
    if (isValid) {
      handleFormSubmit(personalDetails);
    }
  }

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmitPersonalDetails(submit)}>
      {/* This is for the bot */}
      <div className="hidden">
        <label htmlFor="honeyPotEmail">Email</label>
        <input 
          id="honeyPotEmail" 
          type="email" 
          autoComplete="off" 
          {...registerPersonalDetails("honeyPotEmail")}
        />
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="firstName">First Name</label>
        <input 
          type="text"
          id="firstName"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          {...registerPersonalDetails("firstName")}
        />
        {errorsPersonalDetails?.firstName?.message && (
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {errorsPersonalDetails.firstName.message}
          </Typography>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="middleName">Middle Name</label>
        <input 
          type="text"
          id="middleName"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          {...registerPersonalDetails("middleName")}
        />
        {errorsPersonalDetails?.middleName?.message && (
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {errorsPersonalDetails.middleName.message}
          </Typography>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="lastName">Last Name</label>
        <input 
          type="text"
          id="lastName"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm" 
          {...registerPersonalDetails("lastName")}
        />
        {errorsPersonalDetails?.lastName?.message && (
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {errorsPersonalDetails.lastName.message}
          </Typography>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Date of Birth</label>
        <div className="flex space-x-2">
          <div>
            <input 
              className="w-14 mt-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="DD"
              maxLength={2}
              {...registerPersonalDetails("dateOfBirth.day")}
            />
          </div>
          <div>
            <input 
              className="w-14 mt-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="MM"
              maxLength={2}
              {...registerPersonalDetails("dateOfBirth.month")}
            />
          </div>
          <div>
            <input 
              className="w-16 mt-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="YYYY"
              maxLength={4}
              {...registerPersonalDetails("dateOfBirth.year")}
            />
          </div>
        </div>
        {errorsPersonalDetails?.dateOfBirth?.message && (
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {errorsPersonalDetails.dateOfBirth.message}
          </Typography>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Gender</label>
        <div className="flex space-x-2">
          {genders?.map((gender, index) => (
            <div
              key={gender}
              className="w-20"
            >
              <input
                className="peer sr-only"
                id={gender}
                type="radio"
                value={gender}
                {...registerPersonalDetails("sex")}
              />

              <label
                htmlFor={gender}
                className="block w-full text-center cursor-pointer rounded-lg border border-gray-200 p-2.5 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
              >
                <span className="text-sm">{gender}</span>
              </label>
            </div>
          ))} 
        </div>
        {errorsPersonalDetails?.sex?.message && (
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {errorsPersonalDetails.sex?.message}
          </Typography>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="phoneNumber">Phone Number</label>
        <input 
          type="text"
          className="mt-1 w-full max-w-[12rem] rounded-md border-gray-300 shadow-sm sm:text-sm" 
          id="phoneNumber"
          {...registerPersonalDetails("phoneNumber")}
        />
        {errorsPersonalDetails?.phoneNumber?.message && (
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {errorsPersonalDetails.phoneNumber.message}
          </Typography>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="medicalConcern">Medical Concern</label>

        <textarea
          className="w-full rounded-lg border-gray-300 mt-1 text-sm"
          placeholder="Medical Concern"
          rows={5}
          id="medicalConcern"
          {...registerPersonalDetails("medicalConcern")}
        ></textarea>
        {errorsPersonalDetails?.medicalConcern?.message && (
          <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {errorsPersonalDetails.medicalConcern.message}
          </Typography>
        )}
      </div>
      <div className="flex justify-between">
        <Button type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}