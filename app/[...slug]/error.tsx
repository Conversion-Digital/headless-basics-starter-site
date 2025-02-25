'use client' // Error components must be Client Components
import { useEffect } from 'react';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error Component", error);
  }, [error]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-4 text-center">We hit an error!</h2>
        <div className="relative mb-4">
          <Image
            src="https://media.umbraco.io/dev/n3dnfvwm/jpd1714413.jpg"
            alt="Door"
            layout="responsive"
            width={1200}
            height={800}
          />
        </div>
        <p className="text-lg text-center mb-4">
          Oops! It looks like something has gone wrong with this page.
        </p>
        <hr className="my-4" />
        <div className="flex justify-center">
      
        </div>
      </div>
    </div>
  );
}
