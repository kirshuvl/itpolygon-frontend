/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        //"./node_modules/flowbite/**/*.js", // configure the Flowbite JS source template paths
    ],
    theme: {
        screens: {
            sm: "640px",
            lg: "1024px",
            xl: "1280px",
        },
        container: {
            center: true,
            padding: {
                xl: "12px",
            },
        },
        
        extend: {
            transitionDuration: {
                4000: "4000ms",
            },
            maxWidth: {
                '3-cols': '620px',
                '4-cols': '408px',
              }
        },
    },
    plugins: [
        //require("flowbite/plugin"), // require Flowbite's plugin for Tailwind CSS
    ],
};
