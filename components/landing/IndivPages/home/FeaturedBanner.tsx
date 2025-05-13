import { Button } from "@/components/ui/button";
import { Volume2, Music, Radio, Mic2 } from "lucide-react";
import Image from "next/image";

export function FeaturedBanner() {
  return (
    <section className="py-4">
      <div className="container px-0 mx-auto" >
        <div className="relative overflow-hidden rounded-lg bg-black text-white">
          <div className="absolute top-0 right-0 w-1/2 h-full">
            <Image
              src={"/exclusive-products/JBL.png"}
              alt={"image.alt"}
              width={0}
              height={0}
              sizes="100vw"
              className={`h-[200px] lg:h-[300px] w-full object-contain`}
              loading="lazy"
            />
          </div>
          <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-[600px]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enhance Your Music Experience
            </h2>
            <div className="flex gap-4 mb-6">
              {[Volume2, Music, Radio, Mic2].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <Icon className="h-5 w-5" />
                </div>
              ))}
            </div>
            <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
