
import SecondaryNav from "./SecondaryNav";
import Navbar from "@/components/shared/navbar/MainNav";

export default function Header() {
  return (
    <>
      <SecondaryNav />
      <header className="sticky top-0 z-[1000] w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* <MainNav /> */}
        <Navbar />
      </header>
    </>
  );
}
