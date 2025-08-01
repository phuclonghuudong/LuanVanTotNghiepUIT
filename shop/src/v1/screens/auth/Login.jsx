import PageTitle from "../../components/common/products/PageTitle";
import ButtonComponent from "../../components/ui/ButtonComponent";
import IconComponent from "../../components/ui/IconComponent";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <div>
      <PageTitle
        title='Create An Account'
        breadcrumb={[{ label: "Homepage", href: "/" }, { label: "Pages" }, { label: "Login" }]}
      />
      <div className='flex items-center justify-center bg-gray-50 py-5'>
        <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
          <form className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Username</label>
              <div className='flex items-center border px-3 py-2 rounded'>
                <IconComponent icon={FaUser} color='none' size={16} className='text-gray-400 mr-2' />
                <input type='text' placeholder='Enter your username' className='w-full outline-none text-sm' />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Password</label>
              <div className='flex items-center border px-3 py-2 rounded'>
                <IconComponent icon={FaLock} color='none' size={16} className='text-gray-400 mr-2' />
                <input type='password' placeholder='Enter your password' className='w-full outline-none text-sm' />
              </div>
            </div>

            <ButtonComponent title='Login' className='w-full mt-2 bg-black text-white hover:bg-gray-800' rounded='md' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
