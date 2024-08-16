import React from 'react'
import AppContext from '../../Context/AppContext'
import './index.css'

const VideoItem = (props) => {
  const { videoItemData } = props
  const { title, overview, release_date, poster_path } = videoItemData
  const imagePath = "https://image.tmdb.org/t/p/w500"

  return (
    <AppContext.Consumer>
      {value => {
        const { isDarkTheme } = value

        const textColor = isDarkTheme ? "light" : "dark"
        const bgColor = isDarkTheme ? "bgDark" : "bgLight"

        return (
          <div class="card">
            <img src={imagePath + poster_path} alt='' className='posterImage' />
            <p className={`card__title ${textColor}`}>{title}</p>
            <div class={`card__content ${bgColor}`}>
              <p class={`card__title ${textColor}`}>{title}</p>
              <p class={`card__description ${textColor}`}>{overview}</p>
              <p className={`releaseDate ${textColor}`}>Release Data: {release_date}</p>
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}

export default VideoItem