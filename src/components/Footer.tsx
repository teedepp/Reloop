import ReloopLogo from '../assets/Reloop.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <img src={ReloopLogo} alt="Reloop Logo" style={{ height: 28, width: 'auto' }} />
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Reducing waste, one purchase at a time.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">About</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-lime-600 text-sm">Our Mission</a></li>
                <li><a href="#" className="text-gray-500 hover:text-lime-600 text-sm">How It Works</a></li>
                <li><a href="#" className="text-gray-500 hover:text-lime-600 text-sm">Sustainability</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Support</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-lime-600 text-sm">FAQ</a></li>
                <li><a href="#" className="text-gray-500 hover:text-lime-600 text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-lime-600 text-sm">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} <span className="align-middle"><img src={ReloopLogo} alt="Reloop Logo" style={{ height: 20, width: 'auto', display: 'inline' }} /></span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;