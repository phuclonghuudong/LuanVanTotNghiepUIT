import React from 'react'

const TopNavbar = () => {
  return (
      <div className='bg-black'>
        <div className='container mx-auto xl:px-[50px] flex  items-center xl:justify-between justify-center min-h-[45px]  text-white'>
            <div>
                <ul className='flex items-center gap-3'>
                    <li>335-666-6688</li>
                    <li>themesflat@gmail.com</li>
                    <li className='underline'>Our Store</li>
                </ul>
            </div>
            <div className=' hidden xl:block'>
                <select name="" id="">
                    <option value="">Việt Nam</option>
                    <option value="">English</option>
                </select>
            </div>
        
        </div>
    </div>
  )
}

export default TopNavbar
