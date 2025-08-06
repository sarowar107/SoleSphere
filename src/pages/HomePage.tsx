import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoveRight, Percent } from 'lucide-react';
import { fullProductList } from '../data/products';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const newArrivals = fullProductList.filter(p => p.isNewArrival).slice(0, 4);
  const bestSellers = fullProductList.filter(p => p.isBestSeller).slice(0, 4);
  const onSale = fullProductList.filter(p => p.originalPrice).slice(0, 4);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-secondary rounded-lg p-8 md:p-16 overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-4">
              Step Into What's Next
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore the latest collections and find your perfect pair. Unbeatable style and comfort await.
            </p>
            <Link
              to="/products"
              className="group inline-flex items-center justify-center px-6 py-3 text-base font-bold text-primary-foreground bg-primary rounded-lg transition-all duration-300 hover:bg-primary/90"
            >
              Explore All Products
              <MoveRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <img
            src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Featured shoe"
            className="absolute right-0 top-0 h-full w-full md:w-1/2 object-cover opacity-20 md:opacity-100 md:clip-path-polygon-[25%_0,100%_0,100%_100%,0_100%]"
          />
        </motion.div>
      </div>

      {/* New Arrivals Section */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">New Arrivals</h2>
          <Link to="/new-arrivals" className="text-sm font-medium text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Deals of the Day Section */}
      {onSale.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Percent className="text-primary" /> Deals of the Day
            </h2>
            <Link to="/products?onSale=true" className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {onSale.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Best Sellers Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">Our Best Sellers</h2>
          <Link to="/best-sellers" className="text-sm font-medium text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
