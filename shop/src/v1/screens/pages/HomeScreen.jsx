import Collection from "../../components/common/Collection";
import NewsletterBox from "../../components/common/NewsletterBox";
import Seller from "../../components/common/Seller";
import Slide from "../../components/common/Slide";
import OurPolicy from "./../../components/common/OurPolicy";

const HomeScreen = () => {
  return (
    <>
      <div className="w-full overflow-hidden">
        <Slide />
        <Collection />
        <Seller />
        <OurPolicy />
        <NewsletterBox />
      </div>
    </>
  );
};

export default HomeScreen;
