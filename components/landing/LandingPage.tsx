import HeroSection from "./sections/HeroSection/HeroSection";
import MainCategories from "./sections/mainCategories/MainCategories";
import EditorsPick from "./sections/EditorsPick/EditorsPick";
import CategoryProducts from "./sections/CategoryProducts/CategoryProducts";
import BestSellers from "./BestSellers";


const LandingPage = async () => {

  return (
    <div>
      <HeroSection autoplayInterval={5000} progressBarEnabled showNavArrows={false} />
      <MainCategories />
      <EditorsPick/>
      <BestSellers/>
      <CategoryProducts/>
    </div>
  );
};

export default LandingPage;
