export function NewArrivals() {
  return (
    <section className="pt-4 px-10 md:px-20  pb-20">
      <div className="container px-4 mx-auto">
        <div className="py-4 md:py-0">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-4 bg-red-600"></div>
            <p className="text-red-600 font-semibold text-base leading-5">
              This month
            </p>
          </div>
          <div className="flex flex-col space-y-10 md:flex-row md:items-end md:space-x-20 md:py-3">
            <p className="text-4xl leading-10 pt-4 md:py-0">New Arrival</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="relative aspect-square group cursor-pointer">
            <img
              src={"/new-arrival/4.png"}
              alt="PlayStation 5"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/60 flex items-end p-6 rounded-lg">
              <div>
                <h3 className="text-white text-xl font-bold mb-2">
                  PlayStation 5
                </h3>
                <p className="text-white/80 text-sm">
                  Black and White version of the PS5 coming out on sale.
                </p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square group cursor-pointer">
            <img
              src={"/new-arrival/3.png"}
              alt="Womens Collection"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/60 flex items-end p-6 rounded-lg">
              <div>
                <h3 className="text-white text-xl font-bold mb-2">
                  Women{"'"}s Collection
                </h3>
                <p className="text-white/80 text-sm">
                  Featured woman collections that give you another vibe.
                </p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square group cursor-pointer">
            <img
              src={"/new-arrival/2.png"}
              alt="Perfume"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/60 flex items-end p-6 rounded-lg">
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Perfume</h3>
                <p className="text-white/80 text-sm">GUCCI INTENSE OUD EDP</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square group cursor-pointer">
            <img
              src={"/new-arrival/1.png"}
              alt="Speakers"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/60 flex items-end p-6 rounded-lg">
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Speakers</h3>
                <p className="text-white/80 text-sm">
                  Amazon wireless speakers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
