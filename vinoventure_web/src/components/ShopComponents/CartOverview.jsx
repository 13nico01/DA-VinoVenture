import React from 'react'
import { useCart } from './CartContext'

const CartOverview = () => {
    const { cart, removeFromCart, calculateTotal } = useCart();
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">Warenkorb</h1>
        <ul className="space-y-4 border-2 border-white p-2 rounded-lg">
              {cart.map((item) => (
                <li key={item.wine_package_id} className="border-b pb-4 last:border-none">
                  <h4 className="text-lg font-semibold">{item.package_name}</h4>
                  <p className="text-sm text-gray-200 "> {item.price} EUR</p>
                  <p className="text-sm text-gray-600">Anzahl: {item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.wine_package_id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-2"
                  >
                    Entfernen
                  </button>
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-bold mt-4 justify-end text-white">
            Gesamtsumme: {calculateTotal().toFixed(2)} EUR
          </h3>
    </div>
  )
}

export default CartOverview
