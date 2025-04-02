"use client"

// Error components must be Client Components
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Error() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 pt-5">
      <div className="mx-auto flex h-full max-w-md flex-col">
        <h2 className="mb-4 text-center text-2xl font-bold text-my-black">
          404 - Page Not Found
        </h2>
        <div className="relative mb-4">

        </div>
        <p className="mb-4 text-center text-lg text-my-black">
          Oops&#33; It looks like the we hit an issue and couldn&apos;t
          open this page.
        </p>
        <Link
          href={pathname?.startsWith("/au") ? "/au" : "/"}
          className="hover:bg-my-yellow-dark rounded-md bg-my-yellow px-4 py-2 text-center text-lg text-my-black"
        >
          Return to Home Page
        </Link>
        <hr className="my-4" />
        <div className="flex justify-center pb-5">

        </div>
      </div>
    </div>
  )
}
