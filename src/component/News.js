import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spiner from "../Spiner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps ={
        country : 'in',
        category : 'technology'

    }
    static defaultProps= {
        country : PropTypes.string,
        category :PropTypes.string,

    }
  constructor() {
    super();
    this.state = {
      articles: [],
      page:1,
      loading:false,
      totalResults:0
      
    };
  }

  updatedNews =async () =>{
    let url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=edf703324909421186e92af06b833088&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  this.setState({ articles: parsedData.articles,totalResults:parsedData.totalResults,loading : false });

  }
  async componentDidMount() {
    this.updatedNews();
   
  }

  // handleNextClick = async () => {

  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=edf703324909421186e92af06b833088&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading : true})
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading : false
  //   });
  // };

  // handlePreviousClick = async () => {

  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=edf703324909421186e92af06b833088&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading : true})
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading : false
  //   });
  // };
  fetchMoreData = async () => {
    this.setState({page: this.state.page +1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=edf703324909421186e92af06b833088&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading : false
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Top {this.props.category} Headlines</h1>
        {this.state.loading && <Spiner/>}
        <InfiniteScroll
    dataLength={this.state.articles.length}
    next={this.fetchMoreData}
    // inverse={true} //
    hasMore={this.state.articles.length !== this.totalResults}
    loader={<h1>loading</h1>}
    // scrollableTarget="scrollableDiv"
  >
        <div className="row"> 
          {!this.state.loading && this.state.articles.map((Element) => {
            return (
              <div className="col-md-4" key={Element.url}>
                <NewsItem
                  title={Element.title}
                  description={Element.description}
                  imageUrl={Element.urlToImage}
                  newsUrl={Element.url}
                />
              </div>
            );
          })}
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between"> */}
          {/* <button
            type="button"
            className="btn btn-primary"
            disabled = {this.setState.page<=1}
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
            disabled = {this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)}
          >
            Next &rarr;
          </button> */}
        {/* </div> */}
      </div>
    );
  }
}

export default News;
