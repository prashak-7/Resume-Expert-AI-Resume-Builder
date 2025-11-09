import { Menu, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(true);
  }, []);

  return (
    <div className="min-h-[75vh] md:min-h-screen md:pb-16">
      <nav className="z-40 w-full px-4 py-4 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between border-b border-b-gray-300">
        <Logo />

        <ul className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
          <a href="#" className="hover:text-indigo-600 transition">
            Home
          </a>
          <a href="#features" className="hover:text-indigo-600 transition">
            Features
          </a>
          <a href="#testimonials" className="hover:text-indigo-600 transition">
            Testimonials
          </a>
        </ul>

        <div className="flex gap-2">
          {user ? (
            <Link
              to="/dashboard"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-full text-white"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="hidden md:block px-6 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-full text-white"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="hidden md:block rounded-full border hover:bg-slate-50 px-6 py-2"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {!user && (
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden active:scale-80 transition"
          >
            <Menu />
          </button>
        )}
      </nav>
      <div
        className={`fixed inset-0 z-100 bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link to="/register" className="text-white">
          Get started
        </Link>
        <Link to="/login" className="text-white">
          Login
        </Link>

        <button
          onClick={() => setMenuOpen(false)}
          className="aspect-square size-10 p-1 text-white flex items-center justify-center"
        >
          <X />
        </button>
      </div>

      <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32 text-sm">
        <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-indigo-300 blur-[100px] opacity-30"></div>

        <div className="flex items-center mt-18">
          <div className="flex -space-x-3 pr-3">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
              alt="user3"
              className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1]"
            />
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              alt="user1"
              className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2"
            />
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
              alt="user2"
              className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]"
            />
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
              alt="user3"
              className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]"
            />
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="user5"
              className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[5]"
            />
          </div>

          <div>
            <div className="flex ">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} fill="#4f39f6" stroke="#4f39f6" size={16} />
                ))}
            </div>
            <p className="text-sm text-gray-700">Used by 10,000+ users</p>
          </div>
        </div>

        <div className="px-2 mt-8">
          <h1 className="text-5xl md:text-6xl text-center font-medium max-w-2xl">
            Build Your <span className="text-indigo-600"> Perfect Resume</span>{" "}
            with AI and Land Your Dream Job Faster
          </h1>
          <p className="text-base text-center text-slate-600 mx-auto max-w-xl mt-6">
            Build a professional and standout resume using our free AI builder
            and customizable templates.
          </p>
          <Link
            to="/dashboard"
            className="block outline outline-slate-400 outline-offset-3 md:text-2xl px-6 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-full text-white w-fit mx-auto mt-4 md:mt-6"
          >
            Create my resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
