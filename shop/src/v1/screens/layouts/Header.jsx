import React from 'react'

const Header = () => {
  return (
    <div className='bg-black'>
        <div className='container mx-auto px-[130px] flex  items-center justify-between min-h-[51px]  text-white'>
            <div>
                <ul className='flex items-center gap-3'>
                    <li>335-666-6688</li>
                    <li>themesflat@gmail.com</li>
                    <li className='underline'>Our Store</li>
                </ul>
            </div>
            <div>
                <select name="" id="">
                    <option value="">Việt Nam</option>
                    <option value="">English</option>
                </select>
            </div>
        
        </div>
    </div>
  )
}

export default Header
