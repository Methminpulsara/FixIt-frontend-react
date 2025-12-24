import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#050505] pt-20 pb-10 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-black text-dark-bg dark:text-white mb-6 uppercase">FIX<span className="text-primary">IT.</span></h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm text-lg font-medium mb-8">
              Redefining roadside assistance across Sri Lanka. Fast, reliable, and just a click away.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <div key={i} className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-dark-bg transition-all cursor-pointer text-dark-bg dark:text-white">
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-dark-bg dark:text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400 font-bold">
              <li className="hover:text-primary cursor-pointer transition-colors uppercase text-sm">How it Works</li>
              <li className="hover:text-primary cursor-pointer transition-colors uppercase text-sm">Services</li>
              <li className="hover:text-primary cursor-pointer transition-colors uppercase text-sm">Reviews</li>
            </ul>
          </div>

          <div>
            <h4 className="text-dark-bg dark:text-white font-bold mb-6 uppercase tracking-widest text-xs">Emergency</h4>
            <a href="tel:0112345678" className="inline-flex items-center gap-3 bg-primary text-dark-bg px-6 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all">
              <Phone size={20} fill="currentColor" /> CALL NOW
            </a>
          </div>
        </div>
        
        <div className="border-t border-black/5 dark:border-white/5 pt-10 text-center">
          <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">© 2024 FIXIT SRI LANKA. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;