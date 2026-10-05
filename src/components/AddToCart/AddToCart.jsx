import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useCart } from "../ContextFiles/CartContext";
import { useAuth } from "../ContextFiles/AuthContext";

const CheckoutModal = ({ isOpen, onClose, cart, cartDetails = {}, onCheckout }) => {
  const [view, setView] = useState("summary");
  const [orderId, setOrderId] = useState(null);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
  });
  const { clearCart } = useCart(); 

  if (!isOpen) return null;

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [id]: value,
    }));
};


  const handleProceedForm = async () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!cartDetails) {
      console.error("cartDetails is undefined");
      return;
    }

    if (!user || !user.id) {
      alert("You need to be logged in to place an order.");
      console.error("User or user ID is missing.");
      return;
    }

    const { totalAmount } = cartDetails;

    const orderData = {
      userId: user.id,
      items: cart.map(item => ({
        itemId: item._id,
        name: item.name,
        description: item.description,
        price: parseFloat(item.price.replace('$', '')),
        quantity: item.quantity,
      })),
      total: totalAmount,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/orders/create', orderData);
      alert('Order placed successfully');
      const orderId = response.data._id;
      
     setOrderId(orderId)
      console.log('Order ID:', orderId);
      setView("form"); 

    } catch (error) {
      console.error('Error placing order:', error.response ? error.response.data : error.message);
      alert('Failed to place order');
    }
  };

  const handleConfirm = async () => {
    try {
        
        if (orderId) {
            console.log('Order ID:', orderId); 
        } else {
            console.log('Order ID is not defined.');
        }

      
        console.log('User Info:', {
            name: formData.name,
            address: formData.address,
            contact: formData.contact,
        }); 

    
        await axios.post('http://localhost:3001/api/order-confirmations/create', {
            orderId,
            userInfo: {
                name: formData.name,
                address: formData.address,
                contact: formData.contact,
            }
        });
        clearCart();
        setView("confirm");
    } catch (error) {
        console.error('Error confirming order:', error.response ? error.response.data : error.message);
    }
};



  const totalAmount = typeof cartDetails.totalAmount === 'number' ? cartDetails.totalAmount : 0;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-xl text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          ×
        </button>

        {view === "summary" && (
          <>
            <h2 className="text-2xl font-bold font-cursive mb-6 text-gray-800">Order Summary</h2>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-lg font-medium text-gray-700">Total Coffees:</p>
                  <p className="text-lg font-semibold text-primary">{cartDetails.totalCoffees}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-medium text-gray-700">Total Amount:</p>
                  <p className="text-lg font-semibold text-primary">${totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 mr-48 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handleProceedForm}
                  className="bg-primary text-white  py-2 px-4 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                >
                  Proceed
                </button>
              </div>
            </div>
          </>
        )}
        {view === "form" && (
          <>
            <h2 className="text-2xl font-bold font-cursive mb-6 text-gray-800">Checkout</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-semibold text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter your contact number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                />
              </div>
              <button
                type="button"
                onClick={handleConfirm}
                className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
              >
                Confirm Order
              </button>
            </form>
          </>
        )}


        {view === "confirm" && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold font-cursive mb-6 text-gray-800">Order Confirmed</h2>
            <p>Your order has been placed successfully!</p>
            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};


const AddToCart = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, calculateTotals } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const handleQuantityChange = (id, amount) => {
    updateQuantity(id, amount);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };



  const { totalAmount, totalCoffees } = calculateTotals();

  return (
    <div className="py-12">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-cursive text-gray-800">Your Cart</h1>
        </div>

        {/* Cart Items */}
        <div className="space-y-6">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
              >
                <img
                  src={`http://localhost:3001/${item.image}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-bold transition-colors duration-300 ease-in-out hover:text-primary">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500 transition-colors duration-300 ease-in-out hover:text-gray-700">
                    {item.description}
                  </p>
                  <p className="text-lg font-semibold text-yellow-500">{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    disabled={item.quantity <= 1}
                    className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-lg transition-colors duration-300 ease-in-out hover:bg-darkGray"
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-lg transition-colors duration-300 ease-in-out hover:bg-darkGray"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center ml-4 text-lg transition-colors duration-300 ease-in-out hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Cart Summary */}
        <div className="flex items-center justify-between mt-12">
          <h2 className="text-2xl font-bold">Total Amount: ${totalAmount.toFixed(2)}</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white py-2 px-4 rounded-lg text-lg transition-transform duration-300 ease-in-out hover:scale-105"
          >
            Checkout
          </button>
        </div>

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cart={cart}
          cartDetails={{ totalAmount, totalCoffees }}

        />
      </div>
    </div>
  );
};

export default AddToCart;
