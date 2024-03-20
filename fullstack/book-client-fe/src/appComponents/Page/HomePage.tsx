import Slider from "../element/slider";
import FeaturedBooks from "../element/FeaturedBooks";
import ForeignBooks from "../element/ForeignBooks";

const HomePage = () => {
  return (
    <div className="bg-gray-100 container justify-center px-44">
      <Slider />
      <FeaturedBooks />
      <ForeignBooks />
    </div>
  );
};

export default HomePage;
