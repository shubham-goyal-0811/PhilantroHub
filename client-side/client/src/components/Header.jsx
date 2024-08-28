import Logo from '../img/Logo.png';
export default function Header() {
    return (
      <>
        <header>
          <nav
            className="bg-white border-gray-200 p-2.5"
            style={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgb(221, 218, 218)",
            }}
          >
            <div className="flex justify-between items-center">
              <a href="" className="flex items-center">
                <img
                  src={Logo}
                  className="w-16 mx-5 invert"
                  alt="PhilantroHub Logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-black">
                  PhilantroHub
                </span>
              </a>
              <div className="flex items-center lg:order-2">
                <a
                  href="#"
                  className="text-gray-800 dark:text-black hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-100 focus:outline-none dark:focus:ring-gray-400"
                >
                  Log in
                </a>
              </div>
              <div
                className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                id="mobile-menu-2"
              >
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    <a
                      href="#"
                      className="block py-2 pr-4 pl-3 text-gray-600 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 hover:text-black"
                      aria-current="page"
                    >
                      Home
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </>
    );
  }