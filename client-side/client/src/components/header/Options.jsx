import Search from '../../img/search.png';

export default function Options() {
    return (
        <>
            <div className="options flex items-center">
                <ul className="flex font-medium justify-between items-center h-full">
                    <li>
                        <a href="/" className="block text-gray-600 rounded">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/ngo" className="block text-gray-600 rounded">
                            NGO
                        </a>
                    </li>
                    <li className="w-2/12">
                        <div className="search flex justify-center w-full">
                            <img src={Search} alt="" className="w-6/12" />
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}