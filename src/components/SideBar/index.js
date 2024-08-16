import { Link } from "react-router-dom"
import { RiHome7Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLocalMovies } from "react-icons/md";
import { FaTv } from "react-icons/fa";
import AppContext from "../../Context/AppContext";


import "./index.css"

const SideBar = () => (

    <AppContext.Consumer>
        {value => {
            const { isDarkTheme } = value

            const bgColor = isDarkTheme ? "bgDark" : "bgLight"
            const textColor = isDarkTheme ? "light" : "dark"

            return (
                <div className="sideBars">
                    <div className={`lgButton-container ${bgColor}`}>
                        <Link to="/">
                            <li className={`button ${textColor}`}>
                                <RiHome7Fill className={`icon ${textColor}`} /> Home
                            </li>
                        </Link>
                        <Link to="/movies">
                            <li className={`button ${textColor}`}>
                                <MdOutlineLocalMovies className={`icon ${textColor}`} /> Movies
                            </li>
                        </Link>
                        <Link to="/tvshows">
                            <li className={`button ${textColor}`}>
                                <FaTv className={`icon ${textColor}`} />Tv Shows
                            </li>
                        </Link>
                        <li className={`button ${textColor}`}>
                            <CgProfile className={`icon ${textColor}`} /> Profile
                        </li>

                        <div className="contactUsDetails">
                            <h1 className={`contactHeading ${textColor}`}>CONTACT US</h1>
                            <div className="logs-container">
                                <img
                                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                                    alt="facebook logo"
                                    className="contact-logos"
                                />
                                <img
                                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                                    alt="twitter logo"
                                    className="contact-logos"
                                />
                                <img
                                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                                    alt="linked in logo"
                                    className="contact-logos"
                                />
                            </div>
                            <p className={`contact ${textColor}`}>
                                Enjoy! Now to see your channels and recommendations!
                            </p>
                        </div>
                    </div>

                    <div class={`button-container ${bgColor}`}>
                        <Link to="/">
                            <button className={`button ${textColor}`}>
                                <RiHome7Fill className="icon" />
                            </button>
                        </Link>
                        <Link to="/movies">
                            <button className={`button ${textColor}`}>
                                <MdOutlineLocalMovies className="icon" />
                            </button>
                        </Link>
                        <Link to="/tvshows">
                            <button className={`button ${textColor}`}>
                                <FaTv className={`icon ${textColor}`} />
                            </button>
                        </Link>
                        <button className={`button ${textColor}`}>
                            <CgProfile className="icon" />
                        </button>
                    </div>
                </div>
            )
        }}
    </AppContext.Consumer>


)

export default SideBar