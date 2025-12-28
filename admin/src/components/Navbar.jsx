import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {

    return (
        <div className='flex items-center py-1 px-[4%] justify-between'>
            <div className="flex flex-col">
                <img className='w-[max(15%,80px)]' src={assets.logo} alt=""/>
                <span className="text-red-400 text-xs- font-semibold">ADMIN PANEL</span>
            </div>
            <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    )

}

export default Navbar