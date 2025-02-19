const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Branding */}
        <div className="text-lg font-bold">🍽️ FoodFinder</div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://x.com/Karthikeyan_369"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <img src="/icons/x.svg" alt="X" className="w-6 h-6 bg-amber-50" />
          </a>
          <a
            href="https://www.linkedin.com/in/sravan-karthikeyan-seela/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6 bg-amber-50" />
          </a>
          <a
            href="https://github.com/karthikeyan-ss"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <img src="/icons/github.svg" alt="GitHub" className="w-6 h-6 bg-amber-50" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm mt-4 md:mt-0">
          © {new Date().getFullYear()} FoodFinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;