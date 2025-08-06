import React from 'react';
import { Link } from 'react-router-dom';
import { Footprints, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const navLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping & Returns' },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Facebook, href: '#' },
  ];

  return (
    <footer className="bg-secondary border-t border-border mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/home" className="flex items-center gap-2 mb-4">
              <Footprints className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">SoleSphere</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your universe of exclusive sneakers and streetwear.
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-sm text-muted-foreground hover:text-primary">All Products</Link></li>
                <li><Link to="/new-arrivals" className="text-sm text-muted-foreground hover:text-primary">New Arrivals</Link></li>
                <li><Link to="/best-sellers" className="text-sm text-muted-foreground hover:text-primary">Best Sellers</Link></li>
                <li><Link to="/products?onSale=true" className="text-sm text-muted-foreground hover:text-primary">On Sale</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2">
                {navLinks.map(link => (
                  <li key={link.href}><Link to={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} SoleSphere. All Rights Reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-muted-foreground hover:text-primary">
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
