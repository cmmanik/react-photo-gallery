import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Latestphoto from './components/Latestphoto';

function App() {
  return (
    <div className="App">
     <Header/>
        <div className="content-block">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="row">
                  <Latestphoto/>
                </div>
              </div>
            </div>
          </div>
        </div>
     <Footer/>
    </div>
  );
}

export default App;
