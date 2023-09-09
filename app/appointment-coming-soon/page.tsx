import Image from "next/image";
import PlantIcon from "@/public/lifesavers_plant_5.png"
import WaitingIcon from "@/public/lifesavers-waiting.png";

export default function AppointmentComingSoon() {
  return (
    <>
      <div
        className="px-6 md:px-72 pt-24 flex flex-col items-center space-y-6"
      >
        <Image
          src={PlantIcon}
          alt='Plant 5'
          width={70}
        />
        <span className="text-2xl md:text-4xl font-normal text-gray-650 text-center">
          Get Ready for Hassle-Free Appointments!
        </span>

        <span className="md:px-24 text-l md:text-xl font-normal text-gray-650 text-center">
          We&apos;re busy behind the scenes, crafting a seamless booking experience just for you at Mom and Me Clinic. 
          Stay tuned for an effortless way to schedule your appointments!
        </span>
      </div>

      <Image
        src={WaitingIcon}
        alt='Waiting Icon'
        className="absolute bottom-0 w-[500px] md:w-[700px]"
      />
    </>
  )
}