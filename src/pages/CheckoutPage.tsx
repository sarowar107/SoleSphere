import React from 'react';

const CheckoutPage: React.FC = () => {
  // This is a UI-only component. No actual logic is implemented.
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-center mb-12">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Shipping Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Shipping Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input placeholder="First Name" className="h-12 rounded-md border bg-muted px-4" />
            <input placeholder="Last Name" className="h-12 rounded-md border bg-muted px-4" />
          </div>
          <input placeholder="Address" className="w-full h-12 rounded-md border bg-muted px-4" />
          <input placeholder="Apartment, suite, etc. (optional)" className="w-full h-12 rounded-md border bg-muted px-4" />
          <div className="grid sm:grid-cols-3 gap-4">
            <input placeholder="City" className="h-12 rounded-md border bg-muted px-4" />
            <input placeholder="State" className="h-12 rounded-md border bg-muted px-4" />
            <input placeholder="ZIP Code" className="h-12 rounded-md border bg-muted px-4" />
          </div>
          <input type="email" placeholder="Email" className="w-full h-12 rounded-md border bg-muted px-4" />
        </div>

        {/* Payment Details */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Payment Details</h2>
          <div className="bg-secondary p-6 rounded-lg">
            <input placeholder="Card Number" className="w-full h-12 rounded-md border bg-background px-4 mb-4" />
            <input placeholder="Name on Card" className="w-full h-12 rounded-md border bg-background px-4 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="MM / YY" className="h-12 rounded-md border bg-background px-4" />
              <input placeholder="CVC" className="h-12 rounded-md border bg-background px-4" />
            </div>
          </div>
          <button className="w-full bg-primary text-primary-foreground h-14 rounded-md font-semibold text-lg flex items-center justify-center hover:bg-primary/90 transition">
            Pay Now (UI Only)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
