"use client";
import Link from "next/link";
import * as React from "react";
import { Menu, X, Search, ShoppingCart, Heart, User } from "lucide-react";
import { usePathname } from "next/dist/client/components/navigation";

const NAVBAR_ITEMS = [
  { label: "Home", href: "/home" },
  { label: "Shop", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Pages", href: "/pages" },
];

const SearchModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-10 flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl animate-in fade-in slide-in-from-top-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-lg outline-none bg-transparent placeholder:text-gray-400"
              autoFocus
            />
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {searchQuery && (
            <div className="">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Search results for &quot;{searchQuery}&quot;
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                  No results found. Try searching for different keywords.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DesktopNavbar = () => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <nav className="flex bg-white justify-center w-full fixed z-50">
        <div className="px-14 py-6 hidden md:flex w-full max-w-7xl items-center justify-between">
          <Link href="/home" className="text-2xl text-text-primary font-bold">
            Bookstar
          </Link>
          <div className="flex flex-row items-center gap-6">
            {NAVBAR_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${
                  pathname === item.href
                    ? "text-text-primary"
                    : "text-text-muted"
                } hover:text-text-primary transition duration-200`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className=" flex gap-1 justify-center items-center text-primary-blue cursor-pointer hover:scale-105 transition"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-primary-blue" />
            </button>

            <Link
              href="/login"
              className=" flex gap-1 justify-center items-center text-primary-blue cursor-pointer hover:scale-105 transition"
            >
              <User /> Login / Register
            </Link>

            <button className=" flex gap-1 justify-center items-center text-primary-blue cursor-pointer hover:scale-105 transition">
              <ShoppingCart className="h-5 w-5 text-primary-blue" />1
            </button>

            <button className=" flex gap-1 justify-center items-center text-primary-blue cursor-pointer hover:scale-105 transition">
              <Heart className="h-5 w-5 " /> 1
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

const MobileNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <nav
        className={`${
          isOpen ? "bg-white" : "bg-white backdrop-blur-md"
        } md:hidden fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between`}
      >
        <Link href="/home" className="text-xl text-text-primary font-bold">
          Bookstar
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2  text-text-secondary rounded-full transition"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="bg-white text-text-muted items-center absolute top-full right-0 left-0 flex flex-col p-6 shadow-lg gap-[30px]">
            {NAVBAR_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm ${
                  pathname === item.href
                    ? "text-text-primary"
                    : "text-text-muted"
                } `}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex flex-col justify-center items-center gap-4">
              <Link
                href="/login"
                className="text-text-blue flex text-sm font-medium"
              >
                <User /> Login / Register
              </Link>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-text-blue rounded-full transition"
              >
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full flex flex-row gap-1 text-text-blue transition relative">
                <ShoppingCart className="h-5 w-5" />1
              </button>

              <button className="p-2 text-text-blue flex flex-row gap-1 rounded-full transition relative">
                <Heart className="h-5 w-5" />1
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};
