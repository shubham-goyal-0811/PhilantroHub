import Logo from '../img/Logo.png';
import Search from '../img/search.png';
export default function Header() {
  return (
    <>
      <header>
        <nav className="header_nav w-full" style={{ padding: '0.5%' }}>
          <div className="flex w-full items-center justify-between">

            <div className="flex">
              <a href="" className="flex items-center left-0">
                <img src={Logo} className="w-16 mx-5 invert" alt="PhilantroHub Logo" />
              </a>
            </div>

            <div className="flex w-auto items-center lg:order-2 whitespace-nowrap">
              <div className="login w-2/12">
                <a href="/" className="text-gray-800 p-2 dark:text-black hover:bg-gray-50 font-medium rounded-lg text-md">
                  Log in
                </a>
              </div>
            </div>

            <div className="flex w-2/12 items-center">
              <div className="flex justify-evenly">
                <ul className="flex font-medium justify-evenly items-center">
                  <li className="w-2/12">
                    <div className="search">
                      <img src={Search} alt="" className="w-full" />
                    </div>
                  </li>
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