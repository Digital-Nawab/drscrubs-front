import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

function CountryModal() {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        const hasModalShown = localStorage.getItem('hasModalShown');
        if (!hasModalShown) {
            setIsOpen(true);
        }
    }, []);

    useEffect(() => {
        document.body.classList.toggle("overlay__active", isOpen);
    }, [isOpen]);

    const closeModal = () => {
        localStorage.setItem('hasModalShown', true);
        setIsOpen(false);
    };

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
        const countryCode = event.target.id === "ae" ? 'UAE' : 'GB';
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <>
            {
                isOpen && (<>
                    <motion.div
                        initial={{ opacity: 0, y: 1 }}
                        animate={{ opacity: 5, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="newsletter__popup newsletter__show"
                        data-animation="slideInUp"
                    >
                        <div id="boxes" className="newsletter__popup--inner">

                            <button
                                className="newsletter__popup--close__btn"
                                aria-label="search close button"
                                onClick={closeModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={28}
                                    height={28}
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={32}
                                        d="M368 368L144 144M368 144L144 368"
                                    />
                                </svg>
                            </button>
                            <div className="box newsletter__popup--box d-flex align-items-center">
                                <div
                                    className="country-modal__content"
                                    style={{ overflowX: "hidden" }}
                                >
                                    <div className="row">
                                        <div className="container">
                                            <h3 className='text-center mt-3'>We Deliver across the world</h3>
                                            <div className="col-lg-12 m-5">
                                                <ul id="countrylist">
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                       <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="united-states"
                                                            value="us"
                                                            checked={selectedValue === "us"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="us"
                                                        />
                                                        <label htmlFor="united-states">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/unitedstatesofamerica.svg"
                                                                src="/assets/img/flag/unitedstatesofamerica.svg"
                                                            />
                                                            United States
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                       <input
                                                            type="radio"
                                                            name="country-select"
                                                            value="ar"
                                                            checked={selectedValue === "ar"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="ar"
                                                            id="argentina"
                                                        />
                                                        <label htmlFor="argentina">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/argentina.svg"
                                                                src="/assets/img/flag/argentina.svg"
                                                            />
                                                            Argentina
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="australia"
                                                            value="au"
                                                            checked={selectedValue === "au"}
                                                            onChange={handleRadioChange}
                                                        />
                                                        <label htmlFor="australia">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/australia.svg"
                                                                src="/assets/img/flag/australia.svg"
                                                            />
                                                            Australia
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                       <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="belgium"
                                                            value="be"
                                                            checked={selectedValue === "be"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="belgium"
                                                        />
                                                        <label htmlFor="belgium">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/belgium.svg"
                                                                src="/assets/img/flag/belgium.svg"
                                                            />
                                                            Belgium
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                       <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="brazil"
                                                            value="br"
                                                            checked={selectedValue === "br"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="brazil"
                                                        />
                                                        <label htmlFor="brazil">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/brazil.svg"
                                                                src="/assets/img/flag/brazil.svg"
                                                            />
                                                            Brazil
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                       <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="canada"
                                                            value="ca"
                                                            checked={selectedValue === "ca"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="canada"
                                                        />
                                                        <label htmlFor="canada">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/canada.svg"
                                                                src="/assets/img/flag/canada.svg"
                                                            />
                                                            Canada
                                                        </label>
                                                    </li>
                                                    
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="denmark"
                                                            value="dk"
                                                            checked={selectedValue === "dk"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="denmark"
                                                        />
                                                        <label htmlFor="denmark">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/denmark.svg"
                                                                src="/assets/img/flag/denmark.svg"
                                                            />
                                                            Denmark
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="finland"
                                                            value="fi"
                                                            checked={selectedValue === "fi"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="finland"
                                                        />
                                                        <label htmlFor="finland">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/finland.svg"
                                                                src="/assets/img/flag/finland.svg"
                                                            />
                                                            Finland
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="france"
                                                            value="fr"
                                                            checked={selectedValue === "fr"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="france"
                                                        />
                                                        <label htmlFor="france">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/france.svg"
                                                                src="/assets/img/flag/france.svg"
                                                            />
                                                            France
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                       <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="germany"
                                                            value="de"
                                                            checked={selectedValue === "de"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="germany"
                                                        />
                                                        <label htmlFor="germany">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/germany.svg"
                                                                src="/assets/img/flag/germany.svg"
                                                            />
                                                            Germany
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="greece"
                                                            value="gr"
                                                            checked={selectedValue === "gr"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="greece"
                                                        />
                                                        <label htmlFor="greece">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/greece.svg"
                                                                src="/assets/img/flag/greece.svg"
                                                            />
                                                            Greece
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="hong kong"
                                                            value="hK"
                                                            checked={selectedValue === "hK"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="hong kong"
                                                        />
                                                        <label htmlFor="hong kong">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/hongkong.svg"
                                                                src="/assets/img/flag/hongkong.svg"
                                                            />
                                                            Hong Kong
                                                        </label>
                                                    </li>
                                                    <li
                                                        id="indiacountry"
                                                        className="indiacountries" onClick={handleInr}

                                                    >
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="india"
                                                            value="inr"
                                                            checked={selectedValue === "inr"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="india"
                                                        />
                                                        <label htmlFor="india">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/india.svg"
                                                                src="/assets/img/flag/india.svg"
                                                            />
                                                            India
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="italy"
                                                            value="it"
                                                            checked={selectedValue === "it"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="italy"
                                                        />
                                                        <label htmlFor="italy">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/italy.svg"
                                                                src="/assets/img/flag/italy.svg"
                                                            />
                                                            Italy
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="japan"
                                                            value="jp"
                                                            checked={selectedValue === "jp"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="japan"
                                                        />
                                                        <label htmlFor="japan">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/japan.svg"
                                                                src="/assets/img/flag/japan.svg"
                                                            />
                                                            Japan
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                       <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="mexico"
                                                            value="mx"
                                                            checked={selectedValue === "mx"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="mexico"
                                                        />
                                                        <label htmlFor="mexico">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/mexico.svg"
                                                                src="/assets/img/flag/mexico.svg"
                                                            />
                                                            Mexico
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="netherlands"
                                                            value="nl"
                                                            checked={selectedValue === "nl"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="netherlands"
                                                        />
                                                        <label htmlFor="netherlands">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/netherlands.svg"
                                                                src="/assets/img/flag/netherlands.svg"
                                                            />
                                                            Netherlands
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="newzealand"
                                                            value="nz"
                                                            checked={selectedValue === "nz"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="newzealand"
                                                        />
                                                        <label htmlFor="newzealand">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/newzealand.svg"
                                                                src="/assets/img/flag/newzealand.svg"
                                                            />
                                                            New Zealand
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="poland"
                                                            value="pl"
                                                            checked={selectedValue === "pl"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="poland"
                                                        />
                                                        <label htmlFor="poland">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/poland.svg"
                                                                src="/assets/img/flag/poland.svg"
                                                            />
                                                            Poland
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="portugal"
                                                            value="pt"
                                                            checked={selectedValue === "pt"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="portugal"
                                                        />
                                                        <label htmlFor="portugal">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/portugal.svg"
                                                                src="/assets/img/flag/portugal.svg"
                                                            />
                                                            Portugal
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="qatar"
                                                            value="qa"
                                                            checked={selectedValue === "qa"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="qatar"
                                                        />
                                                        <label htmlFor="qatar">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/qatar.svg"
                                                                src="/assets/img/flag/qatar.svg"
                                                            />
                                                            Qatar
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="saudi-arabia"
                                                            value="sa"
                                                            checked={selectedValue === "sa"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="saudi arabia"
                                                        />
                                                        <label htmlFor="saudi-arabia">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/saudiarabia.svg"
                                                                src="/assets/img/flag/saudiarabia.svg"
                                                            />
                                                            Saudi Arabia
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>

                                                        <label htmlFor="singapore">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/singapore.svg"
                                                                src="/assets/img/flag/singapore.svg"
                                                            />
                                                            Singapore
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="south-korea"
                                                            value="south-korea"
                                                            checked={selectedValue === "south-korea"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="south korea"
                                                        />
                                                        <label htmlFor="south-korea">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/southkorea.svg"
                                                                src="/assets/img/flag/southkorea.svg"
                                                            />
                                                            South Korea
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                       <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="spain"
                                                            value="es"
                                                            checked={selectedValue === "es"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="spain"
                                                        />
                                                        <label htmlFor="spain">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/spain.svg"
                                                                src="/assets/img/flag/spain.svg"
                                                            />
                                                            Spain
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="sweden"
                                                            value="se"
                                                            checked={selectedValue === "se"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="spain"
                                                        />
                                                        <label htmlFor="sweden">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/sweden.svg"
                                                                src="/assets/img/flag/sweden.svg"
                                                            />
                                                            Sweden
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="ae"
                                                            checked={selectedValue === "ae"}
                                                            onChange={handleRadioChange}
                                                        />
                                                        <label htmlFor="uae">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/uae.svg"
                                                                src="/assets/img/flag/uae.svg"
                                                            />
                                                            UAE
                                                        </label>
                                                    </li>
                                                    <li className="nonindiacountries" onClick={handleRadioChange}>
                                                        <input
                                                            type="radio"
                                                            name="country-select"
                                                            id="gb"
                                                            checked={selectedValue === "gb"}
                                                            onChange={handleRadioChange}
                                                            defaultValue="united kingdom"
                                                        />
                                                        <label htmlFor="united-kingdom">
                                                            <img
                                                                className="flag"
                                                                modal-lazy-load="/assets/img/flag/unitedkingdom.svg"
                                                                src="/assets/img/flag/unitedkingdom.svg"
                                                            />
                                                            United Kingdom
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </>)
            }
        </>
    )
}

export default CountryModal