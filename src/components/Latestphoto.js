import React, { Component } from 'react';
import axios from 'axios'
import img from'./pages/like_PNG62.png'
import Loader from 'react-loader-spinner'
const key = '83a7330ae7238b04926795b198db24a3462d0c096278c42c9f2806d82ebc561e';
const url = 'https://api.unsplash.com'
class Latestphoto extends Component {

    state = {
        photos: [],
        page: 1,
        loading: true,
        serching: false,
        serch_query: "",
        totalItem:0
    }

    componentDidMount() {
        axios.get(`${url}/photos/?client_id=${key}&page=${this.state.page}&per_page=12`)
            .then(response => {

                this.setState({
                    photos: response.data,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false })

            })

    }

    changePage = () => {
        this.setState({ loading: true })
        this.setState({ page: this.state.page + 1 }, function () {
            axios.get(`${url}/photos/?client_id=${key}&page=${this.state.page}&per_page=12`)
                .then(response => {
                    this.setState({
                        photos: response.data,
                        loading: false
                    })
                })
        })
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

    }

    PREVIOUS = () => {
        this.setState({ loading: true })
        this.setState({ page: this.state.page - 1 }, function () {
            axios.get(`https://api.unsplash.com/photos/?client_id=${key}&page=${this.state.page}&per_page=12`)
                .then(response => {
                    this.setState({
                        photos: response.data,
                        loading: false
                    })
                })
        })
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    serchHandler = e => {
        this.setState({ loading: true })
        this.setState({ serch_query: e.target.value, serching:true, loading:true }, 
            () => {
            
            axios.get(`${url}/search/photos?client_id=${key}&page=${this.state.page}&per_page=12&query=${this.state.serch_query}`)
                .then(result => {
                    this.setState({
                        photos: result.data.results,
                        loading: false,
                       serching:true,
                       page:2,
                       totalItem:result.data.total
                    
                    })
                    console.log(result.data.results)
                })
                .catch(err => console.log(err))
        }
        )

    }
    

    submitHnadlr = e => {
        this.setState({ loading: true })
        e.preventDefault();
        axios.get(`${url}/search/photos?client_id=${key}&page=${this.state.page}&per_page=12&query=${this.state.serch_query}`)
        .then(result => {
            this.setState({
                photos: result.data.results,
                loading: false,
                serching:true,
                page:2,
                totalItem:result.data.total
            })
            console.log(result)
        })
        .catch(err => console.log(err))
    }


    changePageSerchPage = () => {
    
        this.setState({ page: this.state.page + 1 }, function () {
            axios.get(`${url}/search/photos?client_id=${key}&page=${this.state.page}&per_page=12&query=${this.state.serch_query}`)
                .then(response => {
                    this.setState({
                        photos: response.data.results,
                        loading: false,
                        serching:true

                    })
                    console.log(response);
                })
        })
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

    }

    render() {
        let image;
        let pagination;
        let pagaf;
        let serchText;
        let likeimg = {
            width:"40%",
            
        
        }
        let likes  = {
           
            paddingTop: '4px',
            fontSize: '22px',
            display:'inline-block'
        
        }
        if(this.state.serching === true ) {
            serchText = <h2>You are serching {this.state.serch_query} <span> total {this.state.totalItem}</span> </h2>
        } 
        if(this.state.serching === false ) {
            serchText = <h2>Latest Phots</h2>
        }

        if(this.state.serching) {
            pagination = <div className="text-center m-auto">
                {this.state.page < 0 ? "" : <div><button className="btn btn-primary m-2" onClick={this.PREVIOUS}>PREVIOUS PAGE </button>  <button className="btn btn-primary" onClick={this.changePageSerchPage}>NEXT PAGE {this.state.page} </button></div>}
            </div>
        }
        if (this.state.page > 1 && this.state.serching) {

            pagaf = <div className="text-center m-auto"><button className="btn btn-primary" onClick={this.changePageSerchPage}>NEXT PAGE </button></div>
        }
        if (this.state.page === 1 && this.state.serching === false) {

            pagaf = <div className="text-center m-auto"><button className="btn btn-primary" onClick={this.changePage}>NEXT PAGE </button></div>
        }
        if (this.state.page >= 2 && this.state.serching === false ) {
            pagination = <div className="text-center m-auto">
                {this.state.page < 0 ? "" : <div><button className="btn btn-primary m-2" onClick={this.PREVIOUS}>PREVIOUS PAGE </button>  <button className="btn btn-primary" onClick={this.changePage}>NEXT PAGE {this.state.page} </button></div>}
            </div>
        }

        if (this.state.loading) {
            return <React.Fragment>
                <div className="container serchform">
                    <div className="row">
                        <div className="col-lg-6 d-flex ">
                            {serchText}
                        </div>
                        <div className="col-lg-6  text-right"> <form action="" onSubmit={this.submitHnadlr}>
                            <input type="text" onKeyUp={this.onkeyUphande} required value={this.state.serch_query} onChange={this.serchHandler} placeholder="Search Here" />
                            <input type="submit" className='submit' value="Search" />
                        </form>
                        </div>
                    </div>
                </div>
                <div className="loader"><Loader type="ThreeDots" color="#2BAD60" height={80} width={80} /></div>
            </React.Fragment>

        } else {

            if(this.state.photos.length === 0) {
                image = 'No photos available'
            } else {
                image =  this.state.photos.map(photo => {
                    return (
    
                        <React.Fragment key={photo.id}>
    
                            <div className="col-lg-3 mt-2 mb-2">
                                <div className="single-photos d-block"  >
                                    <div  style={{ backgroundImage: `url(${photo.urls.small})`, backgroundRepeat:'no-repeat',
       backgroundSize:'cover' }} className="bgimg">
                                            <a href={photo.urls.full} rel="noopener noreferrer" target="_blank"><p>Show</p></a>
                                    </div>
                                    <div className="row">
                                        <div className="col-8">by -{photo.user.first_name}</div>
                                    <div className="col-4 text-right">
                                        <span><img src={img} style={likeimg}  alt=""/>  <p  style= {likes}> {photo.likes}</p></span>
                                    </div>
                                    </div>
                                </div>
                            </div>
    
    
                        </React.Fragment>
                    );
                })
            }
        }
        return (
            <React.Fragment>

                <div className="col  serchform">
                    <div className="row">
                        <div className="col-lg-6 d-flex ">
                        {serchText}
                        </div>
                        <div className="col-lg-6  text-right"> <form action="" onSubmit={this.submitHnadlr}>
                            <input type="text"  onKeyUp={this.onkeyUphande}  required value={this.state.serch_query} onChange={this.serchHandler} placeholder="Search Here" />
                            <input type="submit" className='submit' value="Search" />
                        </form>
                        </div>
                    </div>
                </div>
                <div className="w-100"></div>

                {image}

                <div className="w-100"></div>
                {/* {pagination } */}
                {this.state.page === 1 ? pagaf : pagination}
            </React.Fragment>
        )
    }
}

export default Latestphoto;
