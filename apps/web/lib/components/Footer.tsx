const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl m-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>

        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-indigo-600">
            Privacy
          </a>
          <a href="#" className="hover:text-indigo-600">
            Terms
          </a>
          <a href="#" className="hover:text-indigo-600">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
