import React, { useState, Fragment } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, incrementAsync, selectCount } from "./productListSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import nftImg from "../assets/dummyNft.jpeg"

import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "listing-type",
    name: "Listing Type",
    options: [
      { value: "buy-now", label: "Buy Now", checked: false },
      { value: "auction", label: "Auction", checked: false },
    ],
  },
  {
    id: "curation",
    name: "Curation",
    options: [
      { value: "curated", label: "Curated", checked: false },
      { value: "non-curated", label: "Non-Curated", checked: false },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      { value: "low", label: "Low", checked: false },
      { value: "medium", label: "Medium", checked: false },
      { value: "high", label: "High", checked: false },
    ],
  },
  {
    id: "collections",
    name: "Collections",
    options: [
      {
        value: "mutant-ape-yacht-club",
        label: "Mutant Ape Yacht Club",
        checked: false,
      },
      { value: "beanz-official", label: "BEANZ Official", checked: false },
      { value: "art-blocks", label: "Art Blocks", checked: false },
      { value: "openpen-edition", label: "Openpen Edition", checked: false },
      { value: "ethlizards", label: "Ethlizards", checked: false },
      { value: "the-captainz", label: "The Captainz", checked: false },
    ],
  },
  {
    id: "chains",
    name: "Chains",
    options: [
      {
        value: "crypto-org-chain",
        label: "Crypto.org Chain",
        checked: false,
      },
      { value: "cronos", label: "Cronos", checked: false },
      { value: "ethereum", label: "Ethereum", checked: false },
      { value: "polygon", label: "Polygon", checked: false },
      { value: "solana", label: "Solana", checked: false },
    ],
  },
  {
    id: "categories",
    name: "Categories",
    options: [
      {
        value: "art",
        label: "Art",
        checked: false,
      },
      { value: "celebrities", label: "Celebrities", checked: false },
      { value: "gaming", label: "Gaming", checked: false },
      { value: "sport", label: "Sport", checked: false },
      { value: "music", label: "Music", checked: false },
      { value: "crypto", label: "Crypto", checked: false },
      {value: "cross-chain", label: "Cross Chain", checked: false },
      {value: "pfp", label: "PFP", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: require("../assets/n-1.jpeg"),
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc: require("../assets/n-2.jpeg"),
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc: require("../assets/n-3.jpeg"),
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 4,
    name: "Basic Tee",
    href: "#",
    imageSrc: require("../assets/n-4.jpeg"),
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 5,
    name: "Basic Tee",
    href: "#",
    imageSrc: require("../assets/n-5.jpeg"),
    price: "$35",
    color: "Black",
  },
  {
    id: 6,
    name: "Basic Tee",
    href: "#",
    imageSrc: require("../assets/n-6.jpeg"),
    price: "$35",
    color: "Black",
  },
  {
    id: 7,
    name: "Basic Tee",
    href: "#",
    imageSrc: require("../assets/n-7.jpeg"),
    price: "$35",
    color: "Black",
  },
  {
    id: 8,
    name: "Basic Tee",
    href: "#",
    imageSrc: require("../assets/n-8.jpeg"),
    price: "$35",
    color: "Black",
  },
  {
    id: 9,
    name: "Basic Tee",
    href: "#",
    imageSrc: require("../assets/n-9.jpeg"),
    price: "$35",
    color: "Black",
  },
];

export default function ProductList() {
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-[rgb(14,13,13)]">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-red-600">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-black p-2 text-red-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  {/* <form className="mt-4 border-t border-red-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-red-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-gray-800 px-2 py-3 text-red-400 hover:text-red-500">
                                <span className="font-medium text-red-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-red-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-red-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-red-200 pb-6 pt-24">
            {/* <h1 className="text-4xl font-bold tracking-tight text-red-900">
              All Products
            </h1> */}

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-red-700 hover:text-red-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-red-400 group-hover:text-red-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-red-900"
                                  : "text-red-500",
                                active ? "bg-red-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-red-400 hover:text-red-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-red-400 hover:text-red-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              {/* <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-red-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-gray-800 py-3 text-sm text-red-400 hover:text-red-500">
                            <span className="font-medium text-red-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-red-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-red-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form> */}

              {/* Product grid */}
              <div className="  lg:col-span-9">
                {/* This is our products list  */}
                <div className="bg-gray-900 ">
                  <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-54">
                    <div className="mt-6 grid  grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="group mt-10 rounded-lg bg-gray-800 p-10 relative"
                        >
                          <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                          </div>
                          <div className="mt-4 flex justify-between">
                            <div>
                              <h3 className="text-sm text-red-700">
                                <a href={product.href}>
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                  />
                                  {product.name}
                                </a>
                              </h3>
                              <p className="mt-1 text-sm text-red-500">
                                {product.color}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-red-900">
                              {product.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Product grid end */}
            </div>
          </section>

          {/* section of product and filters ends */}
          <div className="flex items-center justify-between border-t border-red-200 bg-gray-800 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-red-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">97</span> results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-red-400 ring-1 ring-inset ring-red-300 hover:bg-red-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-red-900 ring-1 ring-inset ring-red-300 hover:bg-red-50 focus:outline-offset-0" */}
                  <a
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-red-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-red-900 ring-1 ring-inset ring-red-300 hover:bg-red-50 focus:z-20 focus:outline-offset-0"
                  >
                    2
                  </a>

                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-red-400 ring-1 ring-inset ring-red-300 hover:bg-red-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
