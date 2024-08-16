import { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import SideBar from './components/SideBar'
import Header from './components/Header'
import AppContext from './Context/AppContext'
import Home from './components/Home'
import Movies from './components/Movies'
import MovieItemDetails from './components/MovieItemDetails'
import TvShows from "./components/TvShows"
import TvShowsItemDetails from './components/TvShowsItemDetails'

class App extends Component {
  state = { isDarkTheme: false }

  toggleTheme = () => {
    this.setState(prevState => ({ isDarkTheme: !prevState.isDarkTheme }))
  }



  render() {
    const { isDarkTheme } = this.state

    return (
      <AppContext.Provider value={{
        isDarkTheme, toggleTheme: this.toggleTheme,
      }}>
        <div>
          <Header />
          <SideBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/movies/:id" component={MovieItemDetails} />
            <Route exact path="/tvshows" component={TvShows} />
            <Route exact path="/tv/:id" component={TvShowsItemDetails} />
          </Switch>

        </div>
      </AppContext.Provider>
    )
  }
}


export default App
