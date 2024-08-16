import { Component } from "react";
import MovieImages from "../MovieImages";
import AppContext from "../../Context/AppContext";

import { IoSearchCircleOutline } from "react-icons/io5";
import "./index.css"


const imageList = [
    {
        id: 1,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723187316/The_shaeshank_redemption_cyozph.jpg",
        title: "The shaeshank redemption"
    },
    {
        id: 2,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723187168/The_godfather_mflewn.jpg",
        title: "The Godfather"
    },
    {
        id: 3,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723187130/The_Dark_Knight_muhk5h.jpg",
        title: "The Dark Knight"
    },
    {
        id: 4,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723024849/Pulp_Fiction_sz4pkc.jpg",
        title: "Pulp Fiction"
    },
    {
        id: 5,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723024755/forrest_gump_snm934.png",
        title: "Forrest Gump"
    },
    {
        id: 6,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723024792/Inception_sewi3t.jpg",
        title: "Inception"
    },
    {
        id: 7,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723187252/The_Matrix_gl1n2e.jpg",
        title: "The Matrix"
    },
    {
        id: 8,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723187248/The_Lord_of_the_Rings_The_Return_of_the_King_weksva.jpg",
        title: "The Lord of the Rings: The Return of the King"
    },
    {
        id: 9,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723187013/The_Dark_Knight_Rises_so4hym.jpg",
        title: "The Dark Knight Rises"
    },
    {
        id: 10,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723024817/Interstellar_xvb24m.jpg",
        title: "Interstellar"
    },
    {
        id: 11,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723024714/Fight_Club_ouzznm.jpg",
        title: "Fight Club"
    },
    {
        id: 12,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723192330/Gladiator_ewa3wn.jpg",
        title: "Gladiator"
    },
    {
        id: 13,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723192552/The_Lord_of_the_Rings_The_Return_of_the_King_negb6z.jpg",
        title: "The Lord of the Rings: The Two Towers"
    },
    {
        id: 14,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723192653/The_Silence_of_the_Lambs_le4cxs.jpg",
        title: "The Silence of the Lambs"
    },
    {
        id: 15,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723192729/The_Departed_chrk4z.jpg",
        title: "The Departed"
    },
    {
        id: 16,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723192807/Saving_Private_Ryan_nkzlzf.jpg",
        title: "Saving Private Ryan"
    },
    {
        id: 17,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723192867/The_Prestige_zdramt.jpg",
        title: "The Prestige"
    },
    {
        id: 18,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723192958/Glory_h1s6xg.jpg",
        title: "Glory"
    },
    {
        id: 19,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723193013/The_Avengers_nz3d4v.jpg",
        title: "The Avengers"
    },
    {
        id: 20,
        imageUrl: "https://res.cloudinary.com/dq1ktqbtb/image/upload/v1723193743/The_Lion_King_g319av.jpg",
        title: "The Lion King"
    },
]


class Movies extends Component {
    state = { searchInput: "" }

    renderMovies = () => {
        const { searchInput } = this.state
        const updateList = imageList.filter(each =>
            each.title.toLowerCase().includes(searchInput.toLowerCase())
        )
        return (
            <>
                {updateList.length === 0 ? (
                    <div className="no-item-view">
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                            className="no-item-img"
                            alt="no item"
                        />
                        <p className="no-item-description">
                            No Movies Found
                        </p>
                    </div>
                ) : (
                    <ul className="moviesImage-container">
                        {updateList.map(eachImage => (
                            <MovieImages movieImagesData={eachImage} key={eachImage.id} />
                        ))}
                    </ul>
                )}
            </>
        )
    }

    onChangeSearchInput = (event) => {
        this.setState({ searchInput: event.target.value })
    }


    render() {
        return (
            <AppContext.Consumer>
                {value => {
                    const { isDarkTheme } = value

                    const homeBgColor = isDarkTheme ? "homeDark" : "homeLight"
                    const textColor = isDarkTheme ? "light" : "dark"


                    return (
                        <div className={`movies-container ${homeBgColor}`}>
                            <div className="heading-search-container">
                                <h1 className={`moviesHeading ${textColor}`}>Movies</h1>
                                <div className="searchContainer">
                                    <IoSearchCircleOutline size={25} className="searchIcon" color="#fff" />
                                    <input className="input" type="search" onChange={this.onChangeSearchInput} />
                                </div>
                            </div>
                            {this.renderMovies()}
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}


export default Movies