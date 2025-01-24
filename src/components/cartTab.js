import React from 'react' 
import { useSelector, useDispatch } from 'react-redux' 
import CartItem from './cartItem';
import { products } from '../products';
import { toggleStatusTab } from '../stores/cart';
import { useState } from 'react';

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const [checkout, setCheckout] = useState(false);
    const [payment, setPayment] = useState(false);
    const [overview, setOverview] = useState(true);
    const [final, setFinal] = useState(false);
    const [total, setTotal] = useState(0);
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();
    const [Name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    }
    const handleCheckout = () => {
        setCheckout(!checkout);
        setOverview(false);
        console.log(carts);
        var t = 0;


        for (let i = 0; i < carts.length; i++) {
            t += (products[(carts[i]?.productId)-1]?.price) * carts[i]?.quantity ;
            console.log(products[carts[i]?.productId]?.price);
        }
        setTotal(t);
    }

    const handlePayment = () => {
        setPayment(true);
        setCheckout(false);
    }

    const handleFinal = () => {
        setFinal(true);
        setPayment(false);
    }

  return (
    <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}
    `}> 
        {overview === true && <div>
            <h2 className='p-5 text-white text-2xl'>Shopping Cart</h2>
        <div className='p-5'>
            {carts.map((item, key) => 
                <CartItem key={key} data={item}/>
            )}
        </div>
        
        <div className='grid grid-cols-2'>
            <button className='bg-black text-white' onClick={handleCloseTabCart}>CLOSE</button>
            <button className='bg-amber-600 text-white' onClick={handleCheckout}>CHECKOUT</button>
        </div>
            </div>}
        {checkout === true && <div>
            <button className='bg-amber-600 text-white p-5 shadow-xl ' onClick={handleCheckout}>Go Back</button>
            <h2 className='p-5 text-white text-center pb- 5 text-2xl'>Total: {total}</h2>
            <h2 className='align-center text-center text-white pb-5 text-2xl'>Customer Information</h2>
            <div className='p-5 grid grid-cols-2'>
                <h3>Name</h3> <input type="text" value={Name} onChange={(e) => setName(e.target.value)} />
                <h3>Address</h3> <textarea name="Text1" cols="40" rows="5" value={address} onChange={(e) => setAddress(e.target.value)}></textarea> 
                <h3>City</h3> <input type="text" />
                <h3>State</h3> <input type="text" />
                <h3>Zip Code</h3> <input type="text" />
                <h3>Phone Number</h3> <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <h3>Email</h3> <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                
            </div>
<button class="button-82-pushable ml-5" onClick={handlePayment}>
  <span class="button-82-shadow"></span>
  <span class="button-82-edge"></span>
  <span class="button-82-front text">
    Submit
  </span>
</button>


           
            </div>}
        {
            payment === true && <div className='p-5'>
                <h2 className='p-5 text-white text-center pb- 5 text-4xl'>Payment</h2>

                <h3 className='p-5 text-white text-center pb- 5 text-2xl'>Payment Method</h3>
                <div className='bg-sky-300 grid grid-cols-2 rounded-md p-5'>
                    <input className='p-5 ' type="radio" name="payment" value="cash" /> <h3>Cash</h3>
                    <input className='p-5 ' type="radio" name="payment" value="card" /> <h3>Card</h3>
                    <input className='p-5 ' type="radio" name="payment" value="upi" /> <h3>UPI</h3>
                </div>

                <button class="button-82-pushable ml-5 mt-10" onClick={handleFinal}>
  <span class="button-82-shadow"></span>
  <span class="button-82-edge"></span>
  <span class="button-82-front text">
    Submit
  </span>
</button>

            </div>

        }
        {
            final === true && <div>
                <h1 className='p-5 text-white text-center pb- 5 text-4xl font-bold bg-sky-300 text-black'>Payment Completed!</h1>
                <h2 className='p-5 text-white text-center pb- 5 text-3xl'>Reciept</h2>

                <div className='bg-[#d98484] rounded-md p-5 m-5'>
                <h3 className='p-5 text-white text-center pb- 5 text-2xl'>Name: {Name}</h3>
                <h3 className='p-5 text-white text-center pb- 5 text-2xl'>Address: {address}</h3> 
                <h3 className='p-5 text-white text-center pb- 5 text-2xl'>Phone: {phone}</h3>
                <h3 className='p-5 text-white text-center pb- 5 text-2xl'> Email: {email}</h3>
                <h3 className='p-5 text-white text-center pb- 5 text-2xl'>Total: {total}</h3>
                </div>

            </div>
        }
        
    </div>
  )
}

export default CartTab