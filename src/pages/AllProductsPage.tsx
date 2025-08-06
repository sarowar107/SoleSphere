import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fullProductList } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';

const brands = [...new Set(fullProductList.map(p => p.brand))];
const categories = [...new Set(fullProductList.map(p => p.category))];

const AllProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filters = useMemo(() => ({
    search: searchParams.get('search') || '',
    brands: searchParams.getAll('brand') || [],
    categories: searchParams.getAll('category') || [],
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 500,
    sort: searchParams.get('sort') || 'rating-desc',
    onSale: searchParams.get('onSale') === 'true',
  }), [searchParams]);

  const updateFilters = useCallback((key: string, value: string | number | boolean) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === '' || value === false || (typeof value === 'number' && value === 0)) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const handleMultiSelect = useCallback((key: 'brands' | 'categories', value: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentValues = newParams.getAll(key);
    if (currentValues.includes(value)) {
      const filtered = currentValues.filter(v => v !== value);
      newParams.delete(key);
      filtered.forEach(v => newParams.append(key, v));
    } else {
      newParams.append(key, value);
    }
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let products = [...fullProductList];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm))
      );
    }
    if (filters.brands.length > 0) {
      products = products.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.categories.length > 0) {
      products = products.filter(p => filters.categories.includes(p.category));
    }
    if (filters.onSale) {
      products = products.filter(p => p.originalPrice);
    }
    products = products.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    
    const [sortKey, sortDir] = filters.sort.split('-');
    products.sort((a, b) => {
        let valA = a[sortKey as keyof typeof a];
        let valB = b[sortKey as keyof typeof b];
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortDir === 'asc' ? -1 : 1;
        if (valA > valB) return sortDir === 'asc' ? 1 : -1;
        return 0;
    });

    return products;
  }, [filters]);

  const FilterSidebar = () => (
    <aside className="w-full lg:w-72 lg:pr-8">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Sort by</h3>
          <select
            value={filters.sort}
            onChange={(e) => updateFilters('sort', e.target.value)}
            className="w-full h-10 rounded-md border bg-muted px-3 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
          >
            <option value="rating-desc">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Alphabetical</option>
          </select>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="flex items-center gap-2">
            <input type="number" value={filters.minPrice || ''} onChange={e => updateFilters('minPrice', Number(e.target.value))} className="w-full h-10 rounded-md border bg-muted px-3 text-sm" placeholder="Min" />
            <span>-</span>
            <input type="number" value={filters.maxPrice || ''} onChange={e => updateFilters('maxPrice', Number(e.target.value))} className="w-full h-10 rounded-md border bg-muted px-3 text-sm" placeholder="Max" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Brands</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {brands.map(brand => (
              <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={filters.brands.includes(brand)} onChange={() => handleMultiSelect('brands', brand)} className="h-4 w-4 rounded text-primary focus:ring-primary" />
                {brand}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={filters.categories.includes(cat)} onChange={() => handleMultiSelect('categories', cat)} className="h-4 w-4 rounded text-primary focus:ring-primary" />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">All Products</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find your perfect fit from our entire collection.</p>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>
        
        <main className="flex-1 lg:pl-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">{filteredProducts.length} products found</p>
            <button className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-md text-sm" onClick={() => setIsFiltersOpen(true)}>
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">No Products Found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 lg:hidden"
            onClick={() => setIsFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-background p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsFiltersOpen(false)} className="p-1">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <FilterSidebar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProductsPage;
