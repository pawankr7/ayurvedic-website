'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, isSubscription?: boolean) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  couponCode: string;
  appliedDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  totalDiscount: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingGap: number;
  hasFreeShipping: boolean;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aaru_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aaru_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (product: Product, quantity = 1, isSubscription = false) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.isSubscription === isSubscription);
      const effectivePrice = isSubscription
        ? Math.round(product.price * (1 - (product.subscriptionDiscount || 15) / 100))
        : product.price;

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.isSubscription === isSubscription
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          price: effectivePrice,
          quantity,
          isSubscription,
          subscriptionIntervalDays: isSubscription ? 30 : undefined
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setAppliedDiscount(0);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AARU10' || clean === 'AARUFIRST') {
      setCouponCode(clean);
      setAppliedDiscount(10); // 10%
      return { success: true, message: 'Coupon applied! You got 10% OFF.' };
    }
    if (clean === 'SHILAJIT50') {
      setCouponCode(clean);
      setAppliedDiscount(50); // Flat ₹50
      return { success: true, message: 'Coupon applied! Flat ₹50 OFF.' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try AARU10.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedDiscount(0);
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  let discountAmount = 0;
  if (couponCode === 'AARU10' || couponCode === 'AARUFIRST') {
    discountAmount = Math.round((subtotal * 10) / 100);
  } else if (couponCode === 'SHILAJIT50') {
    discountAmount = 50;
  }

  const freeShippingThreshold = 599;
  const hasFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const freeShippingGap = Math.max(0, freeShippingThreshold - subtotal);
  const shipping = hasFreeShipping || subtotal === 0 ? 0 : 60;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        couponCode,
        appliedDiscount,
        applyCoupon,
        removeCoupon,
        subtotal,
        totalDiscount: discountAmount,
        shipping,
        total,
        freeShippingThreshold,
        freeShippingGap,
        hasFreeShipping,
        totalItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
