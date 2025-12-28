import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products,currency,addToCart} = useContext(ShopContext);

  const productData = products.find(item => item._id === productId);
  const [image, setImage] = useState(productData ? productData.image[0] : '');
  const [size,setSize] = useState()

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* product Data */}
        <div className='flex flex-col lg:flex-row gap-12 lg:gap-2'>
            
            {/* Images Section */}
            <div className='lg:w-2/2 flex flex-col lg:flex-row gap-6 lg:gap-8'>
                
                {/* Miniatures */}
                <div className='order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px]'>
                    {
                      productData.image.map((item,index)=>(
                        <img 
                          onClick={()=>setImage(item)} 
                          src={item} 
                          key={index} 
                          className='w-24 h-24 lg:w-32 lg:h-32 object-cover flex-shrink-0 cursor-pointer border-2 rounded-lg hover:border-gray-400' 
                          alt="" 
                        />
                      ))
                    }
                </div>
                
                {/* Main Image */}
                <div className='order-1 lg:order-2 flex-1'>
                    <div className='w-full lg:h-[550px] bg-white rounded-lg overflow-hidden border border-gray-100'>
                        <img className='w-full h-full object-cover' src={image} alt="" />
                    </div>
                </div>
                
            </div>

            {/* Product Info Section */}
            <div className='lg:w-1/3 lg:pl-8'>
              <h1 className='font-medium text-2xl lg:text-3xl mb-6'>{productData.name}</h1>
              
              <div className='space-y-6'>
                <div>
                  <h3 className='font-medium mb-2'>Description:</h3>
                  <p className='text-gray-700 text-sm leading-relaxed'>
                    {productData.description}
                  </p>
                </div>
                
                <p className='text-2xl font-bold text-gray-900'>
                  {productData.price} {currency}
                </p>
                
                {/* Size Selector */}
                <div>
                  <p className='font-medium mb-3'>Size:</p>
                  <div className='flex gap-3'>
                    {productData.sizes.map((item,index) => (
                      <button onClick={()=> setSize(item)}
                        key={index}
                        className={`w-12 h-12 border-2 rounded-lg font-medium transition-all duration-200
                        ${item === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-500'
                        }`}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <button onClick={()=>{addToCart(productData._id,size);setSize(undefined);}} className='w-full py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors mt-4'>
                  ADD TO CART
                </button>
                <hr className='mt-8 sm:w-4/5' />
                <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                  <p>100% Original product.</p>
                  <p>Cash on delivery is available on this product.</p>
                  <p>Easy return and exchange policy within 7 days.</p>
                </div>
              </div>
            </div>
        </div>
        {/*descriotion & Review */}
        <div className='mt-20'>

          <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Description</b>
            <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-smtext-gray-500'>
            <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
            <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information. </p>
          </div>

        </div>
        {/*display related products */}
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>;
}

export default Product