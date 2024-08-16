import { Component } from "react";
import { RotatingTriangles } from "react-loader-spinner"

import "./index.css"

const apiStatusConstant = {
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
    initial: "INITIAL"
  }


class TvShowsItemDetails extends Component {
    state = { tvShowsDetails: [], tvShowGenreList: [], tvShowCreatorsList: [], tvShowProductionList: [], apiStatus: apiStatusConstant.initial }

    componentDidMount() {
        this.getTvShowsDetails()
    }

    getFormattedData = (data) => ({
        name: data.name,
        backdrop_path: data.backdrop_path,
        number_of_seasons: data.number_of_seasons,
        number_of_episodes: data.number_of_episodes,
        overview: data.overview,
        homepage: data.homepage

    })

    getTvShowsDetails = async () => {
        this.setState({ apiStatus: apiStatusConstant.inProgress })
        const { match } = this.props
        const { params } = match
        const { id } = params

        const apiUrl = `https://api.themoviedb.org/3/tv/${id}?language=en-US`


        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDJkZDdiN2Y4MDBmYzBhOTA0YzUyZTJiZjNmYWFhNSIsIm5iZiI6MTcyMzU0MTQ4Ny41NjQ4MTQsInN1YiI6IjY2YjA5ZGFlNTQwOTNlM2ZkNWRjNWJlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NtVpdOzTgW5HZOXg4hioYc2lFpNbFHDjhM5fvSPHGQU'
            }
        }

        const response = await fetch(apiUrl, options)

        if (response.ok === true) {
            const data = await response.json()
            const updatedTvData = this.getFormattedData(data)
            const updatedTvShowGenere = data.genres;
            const updateTvShowCreatrors = data.created_by;
            const updatedTvShowsProduction = data.production_companies;
            this.setState({ tvShowsDetails: updatedTvData, tvShowGenreList: updatedTvShowGenere, tvShowCreatorsList: updateTvShowCreatrors, tvShowProductionList: updatedTvShowsProduction , apiStatus: apiStatusConstant.success})
        }else {
            this.setState({ apiStatus: apiStatusConstant.failure })
          }
    }

    renderTvShowGenre = () => {
        const { tvShowGenreList } = this.state

        return (
            <div className="list-container">
                {tvShowGenreList.map(eachItem => (
                    <p className="actors genre">{eachItem.name}</p>
                ))}
            </div>
        )
    }

    renderDirectorsList = () => {
        const { tvShowCreatorsList } = this.state

        const imagePath = "https://image.tmdb.org/t/p/w500"

        return (
            <div className="directorsList-container">
                {tvShowCreatorsList.map(eachItem => (
                    <div className="creatorsList-container">
                        <img src={imagePath + eachItem.profile_path} alt="" className="profileImg" />
                        <p className="text crewText">{eachItem.name}</p>
                    </div>
                ))}
            </div>
        )
    }

    renderProductionList = () => {
        const { tvShowProductionList } = this.state

        const imagePath = "https://image.tmdb.org/t/p/w500"

        return (
            <div className="productionList-container">
                {tvShowProductionList.map(eachItem => (
                    <div className="production-container">
                        <img src={imagePath + eachItem.logo_path} alt="" className="productionImage" />
                        <p className="text crewText">{eachItem.name}</p>
                    </div>
                ))}
            </div>
        )
    }


    renderTvShoesDetails = () => {
        const { tvShowsDetails, tvShowCreatorsList, tvShowProductionList } = this.state
        const { name, backdrop_path, number_of_episodes, number_of_seasons, overview, homepage } = tvShowsDetails

        const imagePath = "https://image.tmdb.org/t/p/w500"


        return (
            <ul>
                <img src={imagePath + backdrop_path} alt="" className="backdropImage" />
                <div className="movieName-website-container">
                <h1 className="text movieHeading">{name}</h1>
                <a href={homepage} target="_blank" rel="noreferrer">
                    <button className="websiteButton homeWebsite">Website</button>
                </a>
                </div>
                <div className="season_episodes">
                    <p className="text">{number_of_seasons} seasons</p>
                    <hr className="hrBreak" />
                    <p className="text">{number_of_episodes} episodes</p>
                </div>
                {this.renderTvShowGenre()}
                <p className="text detailsText">{overview}</p>
                {tvShowCreatorsList.length > 0 ? (
                    <div>
                        <p className="text crewHeading">Directors</p>
                        {this.renderDirectorsList()}
                    </div>
                ) : (
                    ""
                )}
                {tvShowProductionList.length > 0 ? (
                    <div>
                        <p className="text crewHeading">Production</p>
                        {this.renderProductionList()}
                    </div>
                ) : (
                    ""
                )}
            </ul>
        )
    }

    renderLoadingView = () => (
        <div className="homeLoader-container" data-testid="loader">
            <RotatingTriangles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="rotating-triangles-loading"
            />
        </div>
    )

    renderFailureView = () => (
        <div className="no-jobs-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
                className="no-jobs-image"
            />
            <h1 className="failureHeading">Oops! Something Went Wrong</h1>
            <p className="failureDescription">
                We cannot seem to find the page you are looking for
            </p>
            <button type="button" className="failureButton" onClick={this.getTvShowsDetails}>
                Retry
            </button>
        </div>
    )

    renderTvShowsView = () => {
        const { apiStatus } = this.state

        switch (apiStatus) {
            case apiStatusConstant.success:
                return this.renderTvShoesDetails();
            case apiStatusConstant.inProgress:
                return this.renderLoadingView();
            case apiStatusConstant.failure:
                return this.renderFailureView()
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="tvShowsDetails-contaianer">
                {this.renderTvShowsView()}
            </div>
        )
    }
}

export default TvShowsItemDetails