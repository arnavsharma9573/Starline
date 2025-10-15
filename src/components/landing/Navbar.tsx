"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogIn, Menu, X } from "lucide-react";
import WishList from "./WishlistModal";

export default function Navbar() {
  const pathname = usePathname();
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="max-w-7xl mx-auto">
      <div className="container mx-auto max-w-[90rem] flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="relative z-50">
          <a href="/" className="flex items-center mt-2">
            <Image src="/logofinal.png" alt="logo" width={200} height={42} />
          </a>
        </div>

        {/* Desktop Navigation - Centered and Sticky */}
        <nav className="hidden md:flex items-center space-x-8 bg-white/70 backdrop-blur-md px-8 py-4 rounded-full shadow-sm fixed left-1/2 -translate-x-1/2 top-2 z-40">
          <Link
            href="/"
            className={`transition-colors cursor-pointer ${
              pathname === "/"
                ? "font-semibold border-b-2 border-black pb-1"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Home
          </Link>

          <Link
            href="/pricing"
            className={`transition-colors cursor-pointer ${
              pathname === "/pricing"
                ? "font-semibold border-b-2 border-black pb-1"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Pricing
          </Link>

          <Link
            href="/contact"
            className={`transition-colors cursor-pointer ${
              pathname === "/contact"
                ? "font-semibold border-b-2 border-black pb-1"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Contact
          </Link>

          <Link
            href="/api"
            className={`transition-colors cursor-pointer ${
              pathname === "/api"
                ? "font-semibold border-b-2 border-black pb-1"
                : "text-gray-600 hover:text-black"
            }`}
          >
            API
          </Link>
        </nav>

        {/* Desktop Right Side Buttons */}
        <div className="hidden md:flex space-x-2 relative z-50">
          <Button
            onClick={() => setWishlistOpen(true)}
            variant="outline"
            className="rounded-full font-medium"
          >
            Join Waiting List
          </Button>

          <Link href="/auth/signup">
            <Button
              variant="default"
              className="rounded-full cursor-pointer flex items-center gap-2"
            >
              <LogIn className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 relative z-50"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 space-y-4 z-40 md:hidden animate-in slide-in-from-top">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 transition-colors ${
                pathname === "/"
                  ? "font-semibold text-black border-b-2 border-black"
                  : "text-gray-600"
              }`}
            >
              Home
            </Link>

            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 transition-colors ${
                pathname === "/pricing"
                  ? "font-semibold text-black border-b-2 border-black"
                  : "text-gray-600"
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 transition-colors ${
                pathname === "/contact"
                  ? "font-semibold text-black border-b-2 border-black"
                  : "text-gray-600"
              }`}
            >
              Contact
            </Link>

            <Link
              href="/api"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 transition-colors ${
                pathname === "/api"
                  ? "font-semibold text-black border-b-2 border-black"
                  : "text-gray-600"
              }`}
            >
              API
            </Link>

            <div className="pt-4 space-y-3 border-t border-gray-200">
              <Button
                onClick={() => {
                  setWishlistOpen(true);
                  setMobileMenuOpen(false);
                }}
                variant="outline"
                className="w-full rounded-full font-medium"
              >
                Join Waiting List
              </Button>

              <Link href="/auth/signup" className="block">
                <Button
                  variant="default"
                  className="w-full rounded-full cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}

      <WishList open={wishlistOpen} onOpenChange={setWishlistOpen} />
    </header>
  );
}
