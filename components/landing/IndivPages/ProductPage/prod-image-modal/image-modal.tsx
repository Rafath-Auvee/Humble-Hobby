import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ImageModalProps {
  isOpen: boolean;
  imageSource: string;
  thumbnails: string[];
  thumbnailToggle: (index: number) => void;
  closeImageModal: () => void;
}

export default function ImageModal({
  isOpen,
  imageSource,
  thumbnails,
  thumbnailToggle,
  closeImageModal,
}: ImageModalProps) {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
        <div className="relative w-[400px] h-[400px] max-w-screen-lg my-auto md:mt-0 md:mb-auto mx-2 sm:mx-0">
          <section className="flex flex-col gap-4">
            <div className="relative flex items-center justify-center">
              <div className="h-[300px] w-[260px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px] object-cover">
                <Image
                  src={imageSource}
                  fill
                  className="rounded-lg cursor-pointer"
                  alt="Sneaker Image"
                />
              </div>
            </div>
            <Button
              variant="link"
              className="absolute top-2 right-0"
              onClick={closeImageModal}
            >
              <X className="h-8 w-8 text-black border-2 border-black" />
            </Button>
            {/* <div className="flex justify-between items-center">
              {thumbnails.map((thumbnail, index) => (
                <div
                  key={index}
                  onClick={() => thumbnailToggle(index)}
                  className="cursor-pointer rounded-lg relative group"
                >
                  <Image
                    alt="Thumbnail"
                    src={thumbnail}
                    width={65}
                    height={60}
                    className="rounded-lg group-hover:opacity-65 transition-opacity"
                  />
                  <div className="absolute inset-0 border-2 border-transparent rounded-lg transition-all duration-300 group-hover:border-realorange"></div>
                </div>
              ))}
            </div> */}
          </section>
        </div>
      </div>
    )
  );
}
