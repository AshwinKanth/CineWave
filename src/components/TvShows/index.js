import { Component } from "react";
import { RotatingTriangles } from "react-loader-spinner"
import { IoSearchCircleOutline } from "react-icons/io5";

import TvShowsData from "../TvshowsData";
import AppContext from "../../Context/AppContext";

import "./index.css"

const apiStatusConstant = {
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
    initial: "INITIAL"
  }


class TvShows extends Component {
    state = { tvShowsList: [], searchInput: "", apiStatus: apiStatusConstant.initial }

    componentDidMount() {
        this.getTvShows()
    }


    getTvShows = async () => {
        this.setState({ apiStatus: apiStatusConstant.inProgress })
        const apiUrl = "https://api.themoviedb.org/3/trending/tv/day?language=en-US"

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDJkZDdiN2Y4MDBmYzBhOTA0YzUyZTJiZjNmYWFhNSIsIm5iZiI6MTcyMzU0MTQ4Ny41NjQ4MTQsInN1YiI6IjY2YjA5ZGFlNTQwOTNlM2ZkNWRjNWJlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NtVpdOzTgW5HZOXg4hioYc2lFpNbFHDjhM5fvSPHGQU'
            }
        }

        const response = await fetch(apiUrl, options)

        if (response.ok === true) {
            const fetchedData = await response.json()
            const updatedTvShows = fetchedData.results.map(each => ({
                name: each.name,
                poster_path: each.poster_path,
                id: each.id
            }))

            this.setState({ tvShowsList: updatedTvShows , apiStatus: apiStatusConstant.success})
        }else {
            this.setState({ apiStatus: apiStatusConstant.failure })
          }
    }

    renderTvShows = () => {
        const { tvShowsList, searchInput } = this.state

        const updateTvList = tvShowsList.filter(each =>
            each.name.toLowerCase().includes(searchInput.toLowerCase())
        )

        return (
            <>
                {updateTvList.length === 0 ? (
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
                    <ul className="tvShowsList-container">
                        {updateTvList.map(eachItem => (
                            <TvShowsData tvShowsDataDetails={eachItem} key={eachItem.id} />
                        ))}
                    </ul>
                )}
                </>
        )
    }

    onChangeSearchInput = (event) => {
        this.setState({ searchInput: event.target.value })
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
            <button type="button" className="failureButton" onClick={this.getTvShows}>
                Retry
            </button>
        </div>
    )

    renderTvShowsView = () => {
        const { apiStatus } = this.state

        switch (apiStatus) {
            case apiStatusConstant.success:
                return this.renderTvShows();
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
            <AppContext.Consumer>
                {value => {
                    const { isDarkTheme } = value
                    const homeBgColor = isDarkTheme ? "homeDark" : "homeLight"
                    const textColor = isDarkTheme ? "light" : "dark"

                    return (
                        <div className={`tvShows-container ${homeBgColor}`}>
                            <div className="heading-search-container">
                                <h1 className={`tvShowsHeading ${textColor}`}>Tv Shows</h1>
                                <div className="searchContainer">
                                    <IoSearchCircleOutline size={25} className="searchIcon" color="#fff" />
                                    <input className="input" type="search" onChange={this.onChangeSearchInput} />
                                </div>
                            </div>
                            {this.renderTvShowsView()}
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default TvShows