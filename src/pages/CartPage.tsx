import React from 'react';
import { Link } from 'react-router-dom';
import { useStore, CartItem } from '../store/useStore';
import { formatPrice } from '../lib/utils';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => (
    <div className="flex items-center py-6 border-b">
      <img src={item.product.imageUrl} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" />
      <div className="ml-4 flex-grow">
        <Link to={`/product/${item.product.id}`} className="font-semibold hover:text-primary">{item.product.name}</Link>
        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
        <p className="text-sm text-muted-foreground">{formatPrice(item.product.price)}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-md">
          <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="p-2"><Minus className="h-4 w-4" /></button>
          <span className="px-3 text-sm font-semibold">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="p-2"><Plus className="h-4 w-4" /></button>
        </div>
        <p className="w-24 text-right font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
        <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-5 w-5" /></button>
      </div>
    </div>
  );

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
        <h2 className="mt-6 text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="border-b font-semibold text-sm text-muted-foreground hidden md:flex">
            <p className="flex-grow pb-2">Product</p>
            <div className="flex items-center gap-4">
              <p className="w-24 text-center">Quantity</p>
              <p className="w-24 text-right">Total</p>
              <div className="w-8"></div>
            </div>
          </div>
          {cart.map(item => (
            <CartItemRow key={`${item.product.id}-${item.size}`} item={item} />
          ))}
          <div className="mt-6 flex justify-end">
            <button onClick={clearCart} className="text-sm font-medium text-destructive hover:underline">Clear Cart</button>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-secondary p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="border-t my-3"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link to="/checkout" className="mt-6 w-full bg-primary text-primary-foreground h-12 rounded-md font-semibold flex items-center justify-center hover:bg-primary/90 transition">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
