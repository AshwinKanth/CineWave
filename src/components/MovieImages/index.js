import React from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../Context/AppContext'
import "./index.css"

const MovieImages = (props) => {
  const { movieImagesData } = props
  const { imageUrl, id, title } = movieImagesData
  return (
    <AppContext.Consumer>
      {value => {
        const { isDarkTheme } = value

        const textColor = isDarkTheme ? "light" : "dark"

        return (
          <li className='imagesItem-container'>
            <Link to={`/movies/${id}`}>
              <img src={imageUrl} alt='' className='movieImage' />
              <p className={`title ${textColor}`}>{title}</p>
            </Link>
          </li>
        )
      }}
    </AppContext.Consumer>

  )
}

export default MovieImages