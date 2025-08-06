import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../data/products';
import { cn, formatPrice } from '../lib/utils';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart, isAuthenticated, openAuthModal } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    addToCart({ product, size: product.sizes[0], quantity: 1 });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-secondary aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNewArrival && (
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">NEW</span>
            )}
            {product.originalPrice && (
              <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">SALE</span>
            )}
          </div>
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleToggleWishlist}
              className="bg-background/70 backdrop-blur-sm p-2 rounded-full text-foreground hover:text-primary transition-colors"
            >
              <Heart className={cn("h-5 w-5", inWishlist && "fill-primary text-primary")} />
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-background/70 backdrop-blur-sm p-2 rounded-full text-foreground hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-amber-400 shrink-0">
              <Star className="h-4 w-4 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="font-bold text-lg text-primary">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
