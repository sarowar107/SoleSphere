import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Footprints, MoveRight, Zap, ShieldCheck, Star, Users, Package, BarChart } from 'lucide-react';
import { cn } from '../lib/utils';
import { fullProductList } from '../data/products';
import Footer from '../components/Footer';

const AuroraBackground = ({ className, ...props }: React.HTMLProps<HTMLDivElement>) => (
  <div
    className={cn(
      'absolute inset-0 -z-10 transition-bg overflow-hidden',
      '[--aurora:repeating-linear-gradient(100deg,var(--primary)_10%,var(--blue-300)_25%,var(--purple-300)_40%)]',
      '[background-image:var(--aurora)]',
      '[background-size:300%_300%]',
      '[background-position:50%_50%]',
      'after:content-[""] after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_center,transparent_60%,var(--background))]',
      'animate-aurora',
      className
    )}
    {...props}
  />
);

const SectionWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className={cn("container mx-auto px-4 py-24", className)}
  >
    {children}
  </motion.section>
);

const LandingPage: React.FC = () => {
  const brandCount = new Set(fullProductList.map(p => p.brand)).size;

  const stats = [
    { icon: Users, value: '10k+', label: 'Happy Customers' },
    { icon: Package, value: `${brandCount}+`, label: 'Premium Brands' },
    { icon: BarChart, value: '2k+', label: 'Unique Styles' },
  ];

  const features = [
    { icon: ShieldCheck, title: 'Authenticity Guaranteed', description: 'Every item is verified by our team of experts. Shop with confidence.' },
    { icon: Zap, title: 'Lightning-Fast Shipping', description: 'Get your gear when you need it. Express shipping options available worldwide.' },
    { icon: Star, title: 'Exclusive Access', description: 'Be the first to get your hands on limited editions and exclusive drops.' },
  ];

  const testimonials = [
    { name: 'Jordan T.', quote: 'SoleSphere is my go-to. The selection is insane and I always find what I\'m looking for.', avatar: 'Jordan' },
    { name: 'Casey B.', quote: 'The quality and speed of delivery blew me away. 10/10 would recommend!', avatar: 'Casey' },
    { name: 'Alex R.', quote: 'Found a pair I\'ve been hunting for years. The authenticity guarantee gave me peace of mind.', avatar: 'Alex' },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full">
        <AuroraBackground />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20 pb-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="flex items-center gap-3 mb-4">
            <Footprints className="h-12 w-12 text-primary" />
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground">SoleSphere</h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }} className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8">
            Your universe of exclusive sneakers and streetwear. Discover, collect, and define your style.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }} className="flex flex-col sm:flex-row gap-4">
            <Link to="/home" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary-foreground bg-primary rounded-lg overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background">
              Shop Now <MoveRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link to="/home" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-foreground bg-secondary rounded-lg overflow-hidden transition-all duration-300 hover:bg-secondary/80">Join Now</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }} className="w-full max-w-6xl mx-auto mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 rounded-lg bg-background/30 backdrop-blur-sm border border-border">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-center md:justify-start gap-4">
                  <div className="bg-primary/20 text-primary p-3 rounded-md"><stat.icon className="h-7 w-7" /></div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <SectionWrapper>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold tracking-tight">Why SoleSphere?</h2>
          <p className="mt-4 text-lg text-muted-foreground">We're more than a marketplace. We're a community built on trust, speed, and a passion for style.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center">
              <div className="bg-primary/10 text-primary p-4 rounded-full mb-6"><feature.icon className="h-8 w-8" /></div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper className="bg-secondary/50">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold tracking-tight">From Our Community</h2>
          <p className="mt-4 text-lg text-muted-foreground">See what our members are saying about their SoleSphere experience.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background p-8 rounded-lg flex flex-col">
              <p className="text-muted-foreground flex-grow">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4 mt-6">
                <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${testimonial.avatar}`} alt={testimonial.name} className="w-12 h-12 rounded-full bg-primary/20" />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
      <Footer />
    </div>
  );
};

export default LandingPage;
