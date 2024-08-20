import { Link } from "react-router-dom"
import AppContext from '../../Context/AppContext'
import "./index.css"

const TvShowsData = (props) => {
    const { tvShowsDataDetails } = props
    const { poster_path, name, id } = tvShowsDataDetails

    const imagePath = "https://image.tmdb.org/t/p/w500"
    return (
        <AppContext.Consumer>
            {value => {
                const { isDarkTheme } = value
                const textColor = isDarkTheme ? "light" : "dark"
                return (
                    <li className='tvShowsItem-container'>
                        <Link to={`/tv/${id}`} className="link">
                            <img src={imagePath + poster_path} alt="" className="movieImage" />
                            <p className={`title ${textColor}`}>{name}</p>
                        </Link>
                    </li>
                )
            }}
        </AppContext.Consumer>
    )
}

export default TvShowsData