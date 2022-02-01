const Header = () => {
    return (
        <>
            <nav className="bg-[#232f3e] text-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between  items-center mx-auto">
                    <a href="/" className="flex w-2/10">
                        <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">JustBuy</span>
                    </a>
                    <div className="flex w-6/12 justify-between ml-2 mr-3 md:mr-0 md:order-1 ">
                        <input type="text" id="email-adress-icon" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                    </div>
                    <div className="sm:w-4/10 md:flex  md:order-2" id="mobile-menu-3">
                        <div className="flex md:flex-row md:space-x-2  md:text-sm md:font-medium sm:space-x-0 ">
                            <img className="flex-1 mt-1  mr-1 sm:mr-2 w-8 h-8 rounded-full bg-white cursor-pointer hover:bg-gray-700" src="https://img.icons8.com/wired/64/000000/circled-user.png"/>
                            <span class="font-sans block mt-2 lg:inline-block lg:mt-2 lg:ml-6 align-middle text-white hover:text-gray-700">
                                <a href="/" role="button" class="relative flex">
                                    <svg class="flex-1 w-8 h-8 fill-current" viewbox="0 0 24 24">
                                        <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                                    </svg>
                                    <span class="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">5
                                    </span>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Header;