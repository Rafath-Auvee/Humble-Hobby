import { Button } from "@/components/ui/button";
// import { MobileNav } from "../../mobile-nav";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";

export default async function Navbar() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:px-10 lg:px-20 mx-auto flex h-16 items-center justify-between">
        {/* Logo */}

        <div className="relative w-32 h-24 transition-transform duration-300 group-hover:scale-110">
          <Image
            src="/Chaitro Logo.png"
            alt="Company Logo"
            fill
            priority
            className="object-contain"
          />
        </div>



        {/* Right Section */}
        <div className="flex items-center gap-3">

          <UnauthenticatedButtons />
          {/* Mobile Nav */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}



function UnauthenticatedButtons() {
  return (
    <div className="hidden md:flex items-center gap-2">
      <Button variant="ghost" size="sm" className="px-4 rounded-full">Sign In</Button>
      <Button size="sm" className="px-4 rounded-full">Sign Up</Button>
    </div>
  );
}


