import { PersonalDetailsMTFormInterface } from '@/shared/interfaces/appointment';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface AppointmentRequestProps {
  patientFullName: string;
  patientDateOfBirth: string;
  patientPhoneNumber: string;
  patientSex: string;
  patientMedicalConcern: string;
  doctorFullName: string;
  selectedService: string;
  preferredSchedule: string;
  location?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const AppointmentRequestTemplate = ({
  patientFullName = 'Robin Dalmy Tubungbanua',
  patientDateOfBirth = 'October 19, 1997',
  patientPhoneNumber = '919 001 1652',
  patientSex = 'Male',
  patientMedicalConcern = 'Theres a lump on my right butt cheeks that feel tender',
  doctorFullName = 'Thalia Tubungbanua',
  selectedService = 'Prenatal',
  preferredSchedule = 'August 28, 2023 9:00 AM - 12:00 PM',
  location = 'Mom & Me Clinic - Room 611, Velez Medical Arts Building, 8V4W+WXR, Cebu City, Cebu'
}: AppointmentRequestProps) => {
  const previewText = `Appointment Request for ${patientFullName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            {/* <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/logo.png`}
                height="37"
                width="100"
                alt="Mom and Me Clinic Logo"
                className="my-0 mx-auto"
              />
            </Section> */}
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {previewText}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {doctorFullName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{patientFullName}</strong>  has requested an appointment with you. 
            </Text>
            <Section>
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Patient Information
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                <strong>Date Of Birth</strong> {patientDateOfBirth}
              </Text>

              <Text className="text-black text-[14px] leading-[24px]">
                <strong>Contact Number</strong> {patientPhoneNumber}
              </Text>

              <Text className="text-black text-[14px] leading-[24px]">
                <strong>Gender</strong> {patientSex}
              </Text>

              <Text className="text-black text-[14px] leading-[24px]">
                <strong>Medical Concern</strong> <br />
                {patientMedicalConcern}
              </Text>
            </Section>
            <Section>
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Clinic Request
              </Heading>

              <Text className="text-black text-[14px] leading-[24px]">
                <strong>Service Requested</strong> {selectedService}
              </Text>

              <Text className="text-black text-[14px] leading-[24px]">
                <strong>Preferred Schedule</strong> {preferredSchedule}
              </Text>

              <Text className="text-black text-[14px] leading-[24px]">
                <strong>Location</strong> {location}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AppointmentRequestTemplate;