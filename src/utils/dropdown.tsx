import { ChangeEvent, useEffect, useState } from 'react';

const dropdownList = ["lofi", "hiphop"]

function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (event.target.closest('.dropdown') !== document.activeElement) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            // Cleanup function to remove event listener on unmount
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="w-full h-full relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="h-full inline-flex justify-center items-center w-full border-[0.1vw] border-[#D7D7D7] bg-[#D9D9D9]/15 text-white text-sm font-medium focus:outline-none focus:ring-0"
            >
                Genre
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>

            {isOpen && (
                <div className="dropdown absolute z-50 right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {/* List item options */}
                    <div className="py-1">
                        {dropdownList.map(data => (
                            <button onClick={() => console.log(data)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{data}</button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dropdown;