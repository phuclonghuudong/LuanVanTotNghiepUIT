import Collection from "../../components/common/Collection";
import Seller from "../../components/common/Seller";
import Slide from "../../components/common/Slide";

const HomeScreen = () => {
  return (
    <>
      <div className='w-full overflow-hidden'>
        <Slide />
      </div>
      <div className='w-full overflow-hidden'>
        <Collection />
      </div>
      <div className='w-full overflow-hidden'>
        <Seller />
      </div>
    </>
  );
};

export default HomeScreen;
