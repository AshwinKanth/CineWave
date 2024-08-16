import React from 'react'
import { Link } from "react-router-dom"
import Popup from 'reactjs-popup'

import { IoIosMoon } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

import AppContext from '../../Context/AppContext';

import "./index.css"

const Header = () => {
    return (
        <AppContext.Consumer>
            {value => {
                const { isDarkTheme, toggleTheme } = value

                const onClickChangeTheme = () => {
                    toggleTheme()
                }

                const bgColor = isDarkTheme ? "bgDark" : "bgLight"
                const textColor = isDarkTheme ? "light" : "dark"
                const applogo = isDarkTheme ? "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1722248021/CINEwaveLightImage_d8ye47.png" : 'https://res.cloudinary.com/dq1ktqbtb/image/upload/v1722242695/CINEwave_pyhlg2.png'

                return (
                    <div className={`header-container ${bgColor}`}>
                        <Link to="/">
                            <img src={applogo} alt='' className='appLogo' />
                        </Link>
                        <div className='navItems-container'>
                            <li className='navItem' onClick={onClickChangeTheme}>{isDarkTheme ? (<IoSunnyOutline size={30} color='#fff' />) : (<IoIosMoon size={30} />)}</li    >
                            <li className={`navItem ${textColor}`}><CgProfile size={30} /></li>
                            <div className="">
                                <Popup
                                modal
                                    trigger={
                                        <button className={`logoutButton ${textColor}`} type='button'>Logout</button>
                                    }
                                    position="bottom left"
                                >
                                    {close => (
                                    <div className="popup-container">
                                            <p className="popupDescription">Are you sure you want to sign out from Cine Wave?</p>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="trigger-button"
                                                    onClick={() => close()}
                                                >
                                                    Close
                                                </button>
                                                <button className="logOutButton navItem">Logout</button>
                                            </div>
                                        </div>
                                        )}
                                </Popup>
                            </div>
                            <div className="">
                                <Popup
                                modal
                                    trigger={
                                        <button className={`smLogoutButton ${textColor}`} type='button'><IoMdLogOut size={30} /></button>
                                    }
                                    position="bottom left"
                                >
                                    {close => (
                                    <div className="popup-container">
                                            <p className="popupDescription">Are you sure you want to sign out from Cine Wave?</p>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="trigger-button"
                                                    onClick={() => close()}
                                                >
                                                    Close
                                                </button>
                                                <button className="logOutButton navItem">Logout</button>
                                            </div>
                                        </div>
                                        )}
                                </Popup>
                            </div>
                        </div>
                    </div>
                )
            }}
        </AppContext.Consumer >
    )
}

export default Header