import Logo from '../img/Logo.png';
import Search from '../img/search.png';
export default function Header() {
  return (
    <>
      <header>
        <nav className="header_nav w-full" style={{ padding: '0.5%' }}>
          <div className="flex items-center justify-between">

            <div className="flex">
              <a href="" className="flex items-center left-0">
                <img src={Logo} className="w-16 mx-5 invert" alt="PhilantroHub Logo" />
              </a>
            </div>

            <div className="flex items-center lg:order-2 right-0 justify-center">
              <a href="/" className="text-gray-800 dark:text-black hover:bg-gray-50 font-medium rounded-lg text-md" style={{ padding: '2%' }}>
                Log in
              </a>
              <div className="searchBtn w-2/12">
                <img src={Search} alt="" />
              </div>
            </div>

            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
              <div className="flex justify-center">
                <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    <a href="/" className="block text-gray-600 rounded lg:bg-transparent lg:text-primary-700 lg:p-0 hover:text-black">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/" className="block text-gray-600 rounded lg:bg-transparent lg:text-primary-700 lg:p-0 hover:text-black">
                      NGO
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
        </nav>
      </header>
    </>
  );
}