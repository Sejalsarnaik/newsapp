import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  state={
    progress:0
  }

  setProgress = (progress)=> {
    this.setState(
      {progress : progress}
    )
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
            
          />
          <Routes>
            <Route path='/' element={<News setProgress={this.setProgress}   key="general" country="in" category="general" />} ></Route>
            <Route path='/business' element={<News setProgress={this.setProgress}   key="business" country="in" category="business" />} ></Route>
            <Route path='/sports' element={<News setProgress={this.setProgress}   key="sports" country="in" category="sports" />} ></Route>
            <Route path='/entertainment' element={<News setProgress={this.setProgress}   key="entertainment" country="in" category="entertainment" />} ></Route>
            <Route path='/health' element={<News setProgress={this.setProgress}   key="health" country="in" category="health" />} ></Route>
            <Route path='/general' element={<News setProgress={this.setProgress}   key="general" country="in" category="general" />} ></Route>
            <Route path='/science' element={<News setProgress={this.setProgress}   key="science" country="in" category="science" />} ></Route>
            <Route path='/technology' element={<News setProgress={this.setProgress}   key="technology" country="in" category="technology" />} ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}



//export default App;
