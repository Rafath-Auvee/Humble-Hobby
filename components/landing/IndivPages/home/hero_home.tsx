import CategoryList from "@/utils/categories";
import React from "react";
import CaroselImages from "./carosel";

const HeroHome = () => {
  return (
    <div className="grid grid-cols-6 grid-rows-1 gap-x-12  ">
      {/* <div className="hidden md:block col-span-2 scrollbar overflow-y-auto h-[300px] ">
        <CategoryList />
      </div> */}
      {/* <div className="col-span-6 md:col-span-4  md:col-start-3">
        <CaroselImages />
      </div> */}
      <div className="col-span-6 ">
        <CaroselImages />
      </div>
    </div>
  );
};

export default HeroHome;
