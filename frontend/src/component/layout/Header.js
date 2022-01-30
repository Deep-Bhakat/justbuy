const Header = () => {
    return(
    <>
        <nav className="bg-[#232f3e] text-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="/" className="flex">
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">JustBuy</span>
                </a>
                <div className="flex w-6/12 justify-between md:order-1 ">
                    <div className="hidden w-full relative mr-3 md:mr-0 md:block">
                       
                        <input type="text" id="email-adress-icon" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                    </div>
                    
                </div>
                <div className="hidden w-full md:flex md:w-auto md:order-2" id="mobile-menu-3">
                    <div className="flex flex-col mt-4 md:flex-row md:space-x-4 md:mt-0 md:text-sm md:font-medium">
                        
                            <button type="button" className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-1 mb-1 dark:focus:ring-orange-900">Login</button>
                            <span className="text-white text-lg mt-1">Cart</span>
                            <span className="text-black text-center rounded bg-orange-400 text-sm m-2 h-5 w-5">2</span>
                        
                      
                    </div>
                </div>
            </div>
        </nav>

    </>
    );
};

export default Header;