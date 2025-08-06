import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';

const WishlistPage: React.FC = () => {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Heart className="h-16 w-16 mx-auto text-muted-foreground" />
        <h2 className="mt-6 text-2xl font-bold">Your wishlist is empty</h2>
        <p className="mt-2 text-muted-foreground">Add your favorite items to your wishlist to keep track of them.</p>
        <Link to="/products" className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition">
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
