import { ToastContainer } from "react-toastify";
import Routes from "./v1/routes/Routes";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer
        position="top-right text-[12px]"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
