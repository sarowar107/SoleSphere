import React from 'react';
import { User, ShoppingBag, Heart, Settings } from 'lucide-react';

const DashboardPage: React.FC = () => {
  // Dummy data
  const user = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    memberSince: 'June 2024',
  };

  const recentOrders = [
    { id: 'SS-12345', date: 'July 15, 2024', total: '$179.99', status: 'Shipped' },
    { id: 'SS-12340', date: 'July 10, 2024', total: '$249.98', status: 'Delivered' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">My Dashboard</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-1 bg-secondary p-6 rounded-lg flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="text-sm text-muted-foreground mt-2">Member since {user.memberSince}</p>
          <button className="mt-6 w-full bg-primary/10 text-primary h-11 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-primary/20 transition">
            <Settings className="h-4 w-4" />
            Edit Profile
          </button>
        </div>

        {/* Orders and Wishlist */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3"><ShoppingBag className="text-primary"/>Recent Orders</h3>
            <div className="bg-secondary rounded-lg">
              {recentOrders.map(order => (
                <div key={order.id} className="flex justify-between items-center p-4 border-b last:border-b-0">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.total}</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3"><Heart className="text-primary"/>Quick Links</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-secondary p-6 rounded-lg hover:bg-secondary/80 transition">
                <h4 className="font-semibold">Your Wishlist</h4>
                <p className="text-sm text-muted-foreground">View your saved items.</p>
              </div>
              <div className="bg-secondary p-6 rounded-lg hover:bg-secondary/80 transition">
                <h4 className="font-semibold">Track Order</h4>
                <p className="text-sm text-muted-foreground">Check the status of your shipment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
