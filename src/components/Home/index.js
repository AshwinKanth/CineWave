import MoviesSlider from '../MoviesSlider'
import TopRatedMoviesSlider from '../TopRatedMoviesSlider'
import UpCommingMoviesSlider from '../UpCommingMoviesSlider'
import AppContext from "../../Context/AppContext"

import "./index.css"


const Home = () => {

  return (
    <AppContext.Consumer>
      {value => {
        const { isDarkTheme } = value

        const homeBgColor = isDarkTheme ? "homeDark" : "homeLight"
        const textColor = isDarkTheme ? "light" : "dark"

        return (
          <div className={`home-container ${homeBgColor}`}>
            <div>
              <h1 className={`heading ${textColor}`}>Now Playing</h1>
              <MoviesSlider />
            </div>
            <div>
              <h1 className={`heading ${textColor}`}>Top Rated Movies</h1>
              <TopRatedMoviesSlider />
            </div>
            <div>
              <h1 className={`heading ${textColor}`}>UpComming Movies</h1>
              <UpCommingMoviesSlider />
            </div>
          </div>
        )

      }}
    </AppContext.Consumer>
  )
}



export default Home