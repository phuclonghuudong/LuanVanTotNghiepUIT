import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";

const Routes = () => {
  return 1 > 2 ? <AuthRouter /> : <MainRouter />;
};

export default Routes;
