import Image from "next/image";
import TextHighlight from "../utilities/TextHighlight";

export default function Doctors() {
  const imageWidth = 300;
  const imageHeight = 600;

  return (
    <>
      <div className="mx-auto pb-6 md:pb-12">
        <div className="text-left">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Know your Doctors</h1>
        </div>
      </div>
      <div className="flex flex-col space-x-0 space-y-12 md:flex-row md:space-x-12 md:space-y-0">
        <a href="#" className="block">
          <Image
            alt="Art"
            src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="h-96 w-full object-cover"
            width={imageWidth}
            height={imageHeight}
          />

          <h3 className="mt-4 text-lg font-bold text-gray-100 sm:text-xl">
            <TextHighlight bgColor="bg-primary">Dr. Thalia T. Badilles, DPOGS</TextHighlight>
          </h3>

          <p className="mt-2 max-w-sm text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni reiciendis
            sequi ipsam incidunt.
          </p>
          {/* add set appointment link that auto populates form. add clinic schedule. */}
        </a>

        <a href="#" className="block">
          <Image
            alt="Art"
            src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="h-96 w-full object-cover"
            width={imageWidth}
            height={imageHeight}
          />

          <h3 className="mt-4 text-lg font-bold text-gray-100 sm:text-xl">
            <TextHighlight bgColor="bg-primary">Dr. Kim Espiritu-Veloso, DPOGS</TextHighlight>
          </h3>

          <p className="mt-2 max-w-sm text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni reiciendis
            sequi ipsam incidunt.
          </p>
        </a>
      </div>
    </>
  );
}