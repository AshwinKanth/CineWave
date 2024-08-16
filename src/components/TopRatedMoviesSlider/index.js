import React, { Component } from 'react'
import Slider from 'react-slick'
import VideoItem from '../VideoItem' 

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import "./index.css"

class TopRatedMoviesSlider extends Component {
    state = { popularMovesList: [] }

    componentDidMount() {
        this.getPopularMovies()
      }
    
    
      getPopularMovies = async () => {
    
        const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'

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
      
            this.setState({ popularMovesList: updatedData })
          }
    
      }


      getPopularMoviesSlider = () => {
        const { popularMovesList } = this.state
        var settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true
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
                    {popularMovesList.map(eachItem =>(
                        <VideoItem  key={eachItem.id} videoItemData={eachItem}/>
                    ))}
                </Slider>
            </div>
            <div className="smImage-container">
                <Slider {...smSettings}>
                    {popularMovesList.map(eachItem =>(
                        <VideoItem  key={eachItem.id} videoItemData={eachItem}/>
                    ))}
                </Slider>
            </div>
            </>
        )
    }

    render() {
        return (
            <div className='slide-container'>
                {this.getPopularMoviesSlider()}
            </div>
        )
    }
}

export default TopRatedMoviesSlider