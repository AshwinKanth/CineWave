import { Component } from "react";
import "./index.css"


class MovieItemDetails extends Component {
    state = { movieData: [], actorsList: [], genreList: [] }

    componentDidMount() {
        this.getMovieDetails()
    }

    getFormattedData = (data) => ({
        title: data.title,
        director: data.director,
        plot: data.plot,
        production: data.production,
        rating: data.rating,
        runtime: data.runtime,
        boxOffice: data.boxOffice,
        awards: data.awards,
        language: data.language,
        website: data.website,
        year: data.year,
        country: data.country,
        poster: data.poster
    })


    getMovieDetails = async () => {
        const { match } = this.props
        const { params } = match
        const { id } = params


        const apiUrl = `https://freetestapi.com/api/v1/movies/${id}`
        const options = {
            method: "GET"
        }

        const response = await fetch(apiUrl, options)

        if (response.ok === true) {
            const data = await response.json()
            const updatedData = this.getFormattedData(data)
            const updatedActors = data.actors;
            const updtaeGenre = data.genre;
            this.setState({ movieData: updatedData, actorsList: updatedActors, genreList: updtaeGenre })
        }
    }

    renderActors = () => {
        const { actorsList } = this.state

        return (
            <div className="list-container">
                <p className="span">Actors:</p>
                {actorsList.map(eachItem => (
                    <p className="actors">{eachItem}</p>
                ))}
            </div>
        )
    }

    renderGenre = () => {
        const { genreList } = this.state

        return (
            <div className="list-container">
                <p className="span">genre:</p>
                {genreList.map(eachItem => (
                    <p className="actors">{eachItem}</p>
                ))}
            </div>
        )
    }

    renderMovieDetails = () => {
        const { movieData } = this.state

        const { title, director, plot, production, rating, runtime, awards, language, boxOffice, website, year, country } = movieData

        return (

            <div className="details-container">
                <div className="left-container">
                    <h1 className="text movieHeading">{title}</h1>
                    <p className="text"><span className="span">Plot:</span> {plot}</p>
                    <p className="text"><span className="span">Director:</span> {director}</p>
                    <p className="text"><span className="span">Production:</span> {production}</p>
                    <p className="text"><span className="span">Box Office:</span> {boxOffice}</p>
                    <p className="text"><span className="span">Year:</span> {year}</p>
                    <p className="text"><span className="span">Awards:</span> {awards}</p>
                    <a href={website} target="_blank" rel="noreferrer">
                        <button className="websiteButton">Website</button>
                    </a>
                </div>
                <hr className="hrLine" />
                <div className="con">
                    {this.renderActors()}
                    {this.renderGenre()}
                    <div className="rating-runtime">
                        <p className="text"><span className="span">Rating:</span> {rating}</p>
                        <hr className="hrBreak" />
                        <p className="text"><span className="span">Runtime:</span> {runtime} min</p>
                    </div>
                    <div className="rating-runtime">
                        <p className="text"><span className="span">language:</span> {language}</p>
                        <hr className="hrBreak" />
                        <p className="text"><span className="span">Country:</span> {country}</p>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="movieItemDetails-container">
                {this.renderMovieDetails()}
            </div>
        )
    }
}

export default MovieItemDetails