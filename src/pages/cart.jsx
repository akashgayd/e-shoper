import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contextApi/ApiContext';
import { Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, ItemRemove, updateQuantity, getCartTotal } = useCart();
  
  const total = getCartTotal();
  const shipping = 10; 
  const finalTotal = total + shipping;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
        <Link to="/products" className="bg-red-400 text-white px-4 py-2 rounded">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>
      
  
      <div className="flex flex-col lg:flex-row gap-6">
       
        <div className="lg:w-2/3 bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-medium mb-4 hidden lg:block">Cart Items</h2>
      
          <div className="hidden lg:grid grid-cols-5 bg-blue-100 p-2 mb-2 rounded font-medium">
            <div className="col-span-2">Products</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
          </div>
         
          {cart.map(item => (
            <div key={item.id} className="border-b border-gray-200 py-4">
              {/* Mobile Layout - Card style */}
              <div className="lg:hidden flex flex-col space-y-3">
                <div className="flex items-center">
                  <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover mr-3 rounded" />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center border rounded overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-red-300 w-8 h-8 flex items-center justify-center"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-red-300 w-8 h-8 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="font-medium mr-3">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      onClick={() => ItemRemove(item.id)}
                      className="text-red-600"
                     
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Desktop Layout - Grid style */}
              <div className="hidden lg:grid grid-cols-5 items-center">
                <div className="col-span-2 flex items-center">
                  <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover mr-3 rounded" />
                  <span>{item.title}</span>
                </div>
                <div>${item.price.toFixed(2)}</div>
                <div className="flex items-center border rounded overflow-hidden w-24">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-red-300 w-8 h-8 flex items-center justify-center"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2 text-center flex-1">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-red-300 w-8 h-8 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center">
                  ${(item.price * item.quantity).toFixed(2)}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="ml-3 text-red-600"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
        <div className="lg:w-1/3">
          <div className="bg-blue-100 p-4 rounded">
            <h2 className="text-lg font-medium mb-4">Cart Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-red-400 text-white py-3 mt-4 rounded font-medium">
              Proceed To Checkout
            </button>
            <Link
              to="/products"
              className="block text-center text-blue-600 hover:text-blue-800 mt-4"
            >
              Continue Shopping
            </Link>
          </div>
       

          <div className="mt-6">
  <div className="flex flex-col md:flex-row items-center gap-2"> 
    <label htmlFor="couponCode" className="sr-only">Coupon Code</label>
    <input
      type="text"
      id="couponCode"
      placeholder="Coupon Code"
      className="border p-2 flex-grow rounded-md h-10 md:h-auto" 

    />
    <button className="bg-red-500 text-white px-4 py-2 rounded-md h-10 md:h-auto"> 
      Apply
    </button>
  </div>

</div>

        </div>
      </div>
    </div>
  );
};

export default Cart;