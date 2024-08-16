import React, { Component } from 'react'
import { RotatingTriangles } from "react-loader-spinner"
import Slider from 'react-slick'
import VideoItem from '../VideoItem'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import "./index.css"

const apiStatusConstant = {
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
    initial: "INITIAL"
}

class MoviesSlider extends Component {
    state = { moviesList: [], apiStatus: apiStatusConstant.initial }

    componentDidMount() {
        this.getMovies()
    }


    getMovies = async () => {
        this.setState({ apiStatus: apiStatusConstant.inProgress })

        const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDJkZDdiN2Y4MDBmYzBhOTA0YzUyZTJiZjNmYWFhNSIsIm5iZiI6MTcyMjg1MTcxNS4yOTc1NDUsInN1YiI6IjY2YjA5ZGFlNTQwOTNlM2ZkNWRjNWJlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9WaZhGm00-e4c9uvg1hJOjYHdWAGOYT5qHfXhUPErZk'
            }
        };



        const response = await fetch(apiUrl, options)

        if (response.ok === true) {
            const fetchedData = await response.json();
            const updatedData = fetchedData.results.map(eachItem => ({
                title: eachItem.title,
                overview: eachItem.overview,
                release_date: eachItem.release_date,
                poster_path: eachItem.poster_path,
                backdrop_path: eachItem.backdrop_path
            }))

            this.setState({ moviesList: updatedData, apiStatus: apiStatusConstant.success })
        } else {
            this.setState({ apiStatus: apiStatusConstant.failure })
        }

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
            <button type="button" className="failureButton" onClick={this.getMovies}>
                Retry
            </button>
        </div>
    )


    getSlider = () => {
        const { moviesList } = this.state
        var settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true,

        };

        var smSettings = {
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true
        };

        return (
            <>
                <div className="image-container">
                    <Slider {...settings}>
                        {moviesList.map(eachItem => (
                            <VideoItem key={eachItem.id} videoItemData={eachItem} />
                        ))}
                    </Slider>
                </div>
                <div className="smImage-container">
                    <Slider {...smSettings}>
                        {moviesList.map(eachItem => (
                            <VideoItem key={eachItem.id} videoItemData={eachItem} />
                        ))}
                    </Slider>
                </div>
            </>
        )
    }


    renderSliderView = () => {
        const { apiStatus } = this.state

        switch (apiStatus) {
            case apiStatusConstant.success:
                return this.getSlider();
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
            <div className='slide-container'>
                {this.renderSliderView()}
            </div>
        )
    }
}

export default MoviesSlider