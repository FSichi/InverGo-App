import React, { useState } from "react";
import { ThemeContext } from "../../../context/theme/ThemeContext";

const Switch = () => {

    const { theme, setTheme } = React.useContext(ThemeContext);
    const [toggle, setToggle] = useState((theme === 'dark') ? true : false);

    const toggleClass = " transform translate-x-5 bg-black";
    const ligthBack = "md:w-14 md:h-7 w-12 h-6 flex items-center rounded-full p-1 cursor-pointer bg-gray-100";
    const darkBack = "md:w-14 md:h-7 w-12 h-6 flex items-center rounded-full p-1 cursor-pointer bg-gray-400";

    return (
        <>
            {/*   Switch Container */}
            <div
                className={(toggle ? darkBack : ligthBack)}
                onClick={() => {
                    setToggle(!toggle);
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                }}
            >
                {/* Switch */}
                <div
                    className={
                        "bg-teal-600 md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
                        (toggle ? toggleClass : null)
                    }
                ></div>
            </div>
        </>
    );
};

export default Switch;