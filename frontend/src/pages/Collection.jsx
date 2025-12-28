import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import Productitem from '../components/Productitem';

const Collection = () => {

  const { products , search , showSearch} = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev=> prev.filter(item => item !== e.target.value));
    }
    else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value));
    }
    else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

const filteredProducts = (() => {
  let result = products.slice();

  if (showSearch && search) {
    result = result.filter(item =>item.name.toLowerCase().includes(search.toLowerCase()))
  }

  if (category.length > 0) {
    result = result.filter(item =>
      category.includes(item.category)
    );
  }

  if (subCategory.length > 0) {
    result = result.filter(item =>
      subCategory.includes(item.subCategory)
    );
  }

  if (sortType === 'low-high') {
    result.sort((a, b) => a.price - b.price);
  } 
  else if (sortType === 'high-low') {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
})();

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 border-t pt-6'>
        {/* left side - categories */}
        <div className='min-w-60'>
            <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
              <img className={`h-3 sm:hidden ${showFilter ? 'routate-90' : ''}`} src={assets.dropdown_icon} alt="" />  
            </p> 
            <div className={`border border-gray-300 pl-5 mt-6 ${showFilter ? '' : 'hidden' } sm:block`}>
                <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
                    </p>

                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
                    </p>

                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids
                    </p>
                </div>
            </div>
          {/* subcategory filter */}
            <div className={`border border-gray-300 pl-5 my-5 ${showFilter ? '' : 'hidden' } sm:block`}>
                <p className='mb-3 text-sm font-medium'>TYPE</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
                    </p>

                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
                    </p>

                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear 
                    </p>
                </div>
            </div>
        </div>
        {/* right side - products */}
        <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={'ALL'} text2={'COLLECTIONS'} />
                {/* sort by dropdown */}
                <select onChange ={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                    <option value="relavent">Sort by: Relavent</option>
                    <option value="low-high">Sort by: Low to High</option>
                    <option value="high-low">Sort by: High to Low</option>
                </select>
            </div>
            {/* map products */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gray-y-6'>
                {
                    filteredProducts.map((item,index) => (
                      <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Collection