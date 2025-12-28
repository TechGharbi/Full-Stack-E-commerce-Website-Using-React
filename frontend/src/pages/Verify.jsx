import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { backendUrl } from '../../../admin/src/Const'
import {toast} from 'react'
import { useEffect } from 'react'
import {useSearchParams} from 'react-router-dom'
import axios from 'axios'

const Verify = () => {
    const { navigate, token, setCartItems } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()
    console.log(setSearchParams)

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId},{headers:{token}})
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
  /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(()=> {
        verifyPayment()
    },[token])

    return (
        <div>
        
        </div>
    )
}

export default Verify
