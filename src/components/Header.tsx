'use client';

import { Menu, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../store';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemsCount = cartItems.reduce(
    (total: number, item: { quantity: number }) => total + item.quantity,
    0
  );

  return (
    <header className=" bg-slate-50   text-black shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-mono  font-semibold tracking-wide neon-text"
        >
          Future<span className="  text-black">Shop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="hover:text-blue-500 transition-transform transform hover:scale-110 font-mono  font-semibold"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-blue-500 transition-transform transform hover:scale-110 font-mono  font-semibold"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="hover:text-blue-500 flex items-center gap-2 transition-transform transform hover:scale-110"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs shadow-md">
              {cartItemsCount}
            </span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-40 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gradient-to-r from-purple-800 to-blue-800 text-white py-4 shadow-lg z-50">
          <Link to="/" className="block px-6 py-2 hover:bg-purple-700">
            Home
          </Link>
          <Link to="/products" className="block px-6 py-2 hover:bg-purple-700">
            Products
          </Link>
          <Link
            to="/cart"
            className="block px-6 py-2 hover:bg-purple-700 flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="bg-pink-500 text-white rounded-full px-2 py-1 text-xs">
              {cartItemsCount}
            </span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
