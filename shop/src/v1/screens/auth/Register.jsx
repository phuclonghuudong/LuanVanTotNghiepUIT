import ButtonComponent from "../../components/ui/ButtonComponent";
import IconComponent from "../../components/ui/IconComponent";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Register = () => {
  return (
    <div>
      <div className='flex items-center justify-center bg-gray-50 py-5'>
        <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-center mb-6'>Create Account</h2>
          <form className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Full Name</label>
              <div className='flex items-center border px-3 py-2 rounded'>
                <IconComponent icon={FaUser} color='none' size={16} className='text-gray-400 mr-2' />
                <input type='text' placeholder='Enter your name' className='w-full outline-none text-sm' />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Email</label>
              <div className='flex items-center border px-3 py-2 rounded'>
                <IconComponent icon={FaEnvelope} color='none' size={16} className='text-gray-400 mr-2' />
                <input type='email' placeholder='Enter your email' className='w-full outline-none text-sm' />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Password</label>
              <div className='flex items-center border px-3 py-2 rounded'>
                <IconComponent icon={FaLock} color='none' size={16} className='text-gray-400 mr-2' />
                <input type='password' placeholder='Create a password' className='w-full outline-none text-sm' />
              </div>
            </div>

            <ButtonComponent
              title='Register'
              className='w-full mt-2 bg-black text-white hover:bg-gray-800'
              rounded='md'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
