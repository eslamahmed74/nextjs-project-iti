import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-orange-800 mb-4">
              Tasty Recipes
            </h3>
            <p className="text-gray-600">
              Discover the world's best recipes from home cooks and professional
              chefs. Share your culinary creations and find inspiration for your
              next meal.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-orange-600 hover:text-orange-800">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-orange-600 hover:text-orange-800">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-orange-600 hover:text-orange-800">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-orange-600 hover:text-orange-800">
                <FaPinterest size={20} />
              </a>
              <a href="#" className="text-orange-600 hover:text-orange-800">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-orange-700 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  Recipes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-orange-700 mb-4">
              Newsletter
            </h4>
            <p className="text-gray-600 mb-4">
              Subscribe to get weekly recipe inspiration
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg border border-r-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 w-full"
              />
              <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-r-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-orange-100 mt-8 pt-6 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} Tasty Recipes. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-orange-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-orange-600">
              Terms of Service
            </a>
            <a href="#" className="hover:text-orange-600">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
