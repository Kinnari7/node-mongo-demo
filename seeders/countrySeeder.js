const mongoose = require("mongoose");
const Countries = require("../models/countryModel");
require("../index");
1;
// Function to seed countries
const seedCountries = async () => {
    try {
        const countries = [
            { title: "United States", count: 1, status: true, image: "https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg", index: 1 },
            { title: "Canada", count: 1, status: true, image: "/public/images/canada-flag.png", index: 2 },
            { title: "United Kingdom", count: 1, status: true, image: "/public/images/uk-flag.png", index: 3 },
            { title: "Australia", count: 1, status: true, image: "/public/images/australia-flag.png", index: 4 },
            { title: "Germany", count: 1, status: true, image: "/public/images/germany-flag.png", index: 5 },
            { title: "France", count: 1, status: true, image: "/public/images/france-flag.png", index: 6 },
            { title: "India", count: 1, status: true, image: "/public/images/india-flag.png", index: 7 },
            { title: "Japan", count: 1, status: true, image: "/public/images/japan-flag.png", index: 8 },
            { title: "Brazil", count: 1, status: true, image: "/public/images/brazil-flag.png", index: 9 },
            { title: "South Africa", count: 1, status: true, image: "/public/images/south-africa-flag.png", index: 10 },
            { title: "Mexico", count: 1, status: true, image: "/public/images/mexico-flag.png", index: 11 },
            { title: "Italy", count: 1, status: true, image: "/public/images/italy-flag.png", index: 12 },
            { title: "Russia", count: 1, status: true, image: "/public/images/russia-flag.png", index: 13 },
            { title: "Spain", count: 1, status: true, image: "/public/images/spain-flag.png", index: 14 },
            { title: "Netherlands", count: 1, status: true, image: "/public/images/netherlands-flag.png", index: 15 },
            { title: "Saudi Arabia", count: 1, status: true, image: "/public/images/saudi-arabia-flag.png", index: 16 },
            { title: "Argentina", count: 1, status: true, image: "/public/images/argentina-flag.png", index: 17 },
            { title: "Sweden", count: 1, status: true, image: "/public/images/sweden-flag.png", index: 18 },
            { title: "Turkey", count: 1, status: true, image: "/public/images/turkey-flag.png", index: 19 },
            { title: "Nigeria", count: 1, status: true, image: "/public/images/nigeria-flag.png", index: 20 },
            { title: "Thailand", count: 1, status: true, image: "/public/images/thailand-flag.png", index: 21 },
            // Add more countries as needed
        ];

        await Countries.insertMany(countries);
        console.log("Countries seeded successfully!");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding countries:", error);
    }
};

seedCountries();