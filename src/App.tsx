import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Layout from './components/Layout';
import AuthModal from './components/AuthModal';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AllProductsPage = lazy(() => import('./pages/AllProductsPage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

const LoadingFallback: React.FC = () => (
  <div className="w-full h-screen flex items-center justify-center bg-background">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  useTheme(); // Initialize and apply theme

  const createFilteredPage = (filterKey: string, filterValue: any) => {
    const searchParams = new URLSearchParams();
    if (filterKey === 'isNewArrival') {
      // In a real app, you'd sort by creation date. Here we just filter.
      // This is a placeholder for a more complex filtering logic.
    }
    if (filterKey === 'isBestSeller') {
      searchParams.set('sort', 'rating-desc');
    }
    return <Navigate to={`/products?${searchParams.toString()}`} replace />;
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/new-arrivals" element={<Navigate to="/products?sort=newest" replace />} />
            <Route path="/best-sellers" element={<Navigate to="/products?sort=rating-desc" replace />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Routes>
        <AuthModal />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
