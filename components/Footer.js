import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { GiFullPizza } from "react-icons/gi";
import { FaFacebookF, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer className="flex flex-col h-auto md:h-[calc(100vh - 100px] bg-gray-800">
      <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-4 pt-12 text-md">
        <div className="cols-span-1">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-md font-semibold text-white">About Us</h3>
            <Link href="#">
              <a className="listItem" href="#">
                Our Story
              </a>
            </Link>
            <Link href="#">
              <a className="listItem" href="#">
                Menu
              </a>
            </Link>
            <Link href="#">
              <a className="listItem" href="#">
                Deals
              </a>
            </Link>
            <Link href="#">
              <a className="listItem" href="#">
                Locations
              </a>
            </Link>
          </div>
        </div>
        <div className="cols-span-1">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-md font-semibold text-white">Corporate</h3>
            <Link href="#">
              <a className="listItem" href="#">
                Franchising
              </a>
            </Link>

            <Link href="#">
              <a className="listItem" href="#">
                Investor Relations
              </a>
            </Link>

            <Link href="#">
              <a className="listItem" href="#">
                Recruitment
              </a>
            </Link>
            <Link href="#">
              <a className="listItem" href="#">
                Press Enquiries
              </a>
            </Link>
          </div>
        </div>
        <div className="cols-span-1">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-md font-semibold text-white">Help & Service</h3>
            <Link href="#">
              <a className="listItem" href="#">
                Contact Us
              </a>
            </Link>

            <Link href="#">
              <a className="listItem" href="#">
                Speed Guarantee
              </a>
            </Link>
            <Link href="#">
              <a className="listItem" href="#">
                FAQs
              </a>
            </Link>

            <Link href="#">
              <a className="listItem" href="#">
                Nutrition & Allergens
              </a>
            </Link>
          </div>
        </div>
        <div className="cols-span-1">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-md font-semibold text-white">Our Policies</h3>
            <Link href="#">
              <a className="listItem" href="#">
                Privacy Policy
              </a>
            </Link>

            <Link href="#">
              <a className="listItem" href="#">
                Terms & Conditions
              </a>
            </Link>
            <Link href="#">
              <a className="listItem" href="#">
                Cookies
              </a>
            </Link>

            <Link href="#">
              <a className="listItem" href="#">
                Responsible Disclosure
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center pt-12">
        <Link href="/">
          <span className="flex items-center text-yellow-400 text-xl font-bold italic">
            <p>
              Follow<span className="text-white"> Us</span>
            </p>
          </span>
        </Link>
      </div>
      <div className="flex pt-5 pb-8 justify-center space-x-6 text-lg">
        <Link href="#">
          <a className="listItem rounded-full p-3 border" href="#">
            <BsInstagram className="w-6 h-6" />
          </a>
        </Link>

        <Link href="#">
          <span className="listItem rounded-full p-3 border" href="#">
            <FaFacebookF className="w-6 h-6" />
          </span>
        </Link>

        <Link href="#">
          <a className="listItem rounded-full p-3 border" href="#">
            <BsTwitter className="w-6 h-6" />
          </a>
        </Link>
        <Link href="#">
          <a className="listItem rounded-full p-3 border" href="#">
            <FaTiktok className="w-6 h-6" />
          </a>
        </Link>
        <Link href="#">
          <a className="listItem rounded-full p-3 border" href="#">
            <BsInstagram className="w-6 h-6" />
          </a>
        </Link>
      </div>
      <div className="flex items-center justify-center text-white text-md py-5">
        <p>Copyright © 2022 PizzaRustica. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
