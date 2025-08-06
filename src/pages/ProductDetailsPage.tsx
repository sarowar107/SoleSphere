import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fullProductList, Product } from '../data/products';
import { Star, Plus, Minus, Heart, ShoppingCart } from 'lucide-react';
import { cn, formatPrice } from '../lib/utils';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = fullProductList.find(p => p.id === id);

  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const inWishlist = product ? isInWishlist(product.id) : false;

  const [selectedSize, setSelectedSize] = useState<number | null>(product?.sizes[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.imageUrl);

  const recommendedProducts = useMemo(() => {
    if (!product) return [];
    return fullProductList
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/products" className="mt-4 inline-block text-primary hover:underline">
          Back to all products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({ product, size: selectedSize, quantity });
    } else {
      alert('Please select a size.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-secondary mb-4">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.gallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={cn(
                  "aspect-square rounded-md overflow-hidden ring-2 ring-transparent transition",
                  mainImage === img ? "ring-primary" : "hover:ring-primary/50"
                )}
              >
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm font-medium text-primary">{product.category}</p>
          <h1 className="text-4xl font-extrabold tracking-tight mt-1">{product.name}</h1>
          <p className="text-lg text-muted-foreground mt-1">{product.brand}</p>

          <div className="flex items-center mt-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("h-5 w-5", i < Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground")} />
              ))}
            </div>
            <p className="ml-2 text-sm text-muted-foreground">{product.rating.toFixed(1)} ({product.reviewCount} reviews)</p>
          </div>

          <p className="text-3xl font-bold text-primary mt-6">{formatPrice(product.price)}</p>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-foreground">Select Size</h3>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "border rounded-md py-2 text-sm font-medium transition",
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:border-primary"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center border rounded-md">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3"><Minus className="h-4 w-4" /></button>
              <span className="px-4 font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="p-3"><Plus className="h-4 w-4" /></button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-primary-foreground h-12 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="h-12 w-12 border rounded-md flex items-center justify-center hover:border-primary hover:text-primary transition"
            >
              <Heart className={cn("h-6 w-6", inWishlist && "fill-primary text-primary")} />
            </button>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-foreground">Description</h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
