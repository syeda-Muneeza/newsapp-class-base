import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {

static defaultProps = {
  country:"us",
  pagesize:8,
  category:"general"  
}
static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

capitalize=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
constructor(props) {
    super(props);
    console.log("Hello i am a constructor");
    this.state = {
      articles: [],
      loading: true,
      page:1,
      totalResults:0
    }
    document.title=`${this.capitalize(this.props.category)}- Daily News`;
  }
  async UpdateNews(){
    //   console.log("cmd");
    this.props.setProgress(10);
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d479dfd1c3724ec2a4f8fd2256e7c26a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})  
      let data= await fetch(url);
      this.props.setProgress(30);
      let parsedData=await data.json()
      console.log(parsedData);
      this.props.setProgress(50);
      this.setState({articles:parsedData.articles,
        totalResults:parsedData.totalResults,
    loading:false})
    this.props.setProgress(100);


  }
  async componentDidMount(){
    //   console.log("cmd");
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d479dfd1c3724ec2a4f8fd2256e7c26a&page=1&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true})  
    //   let data= await fetch(url);
    //   let parsedData=await data.json()
    //   console.log(parsedData);
    //   this.setState({articles:parsedData.articles,
    //     totalResults:parsedData.totalResults,
    // loading:false})
    this.UpdateNews()


  }

  handlePrevClick= async()=>{
// console.log("Previous");
// let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d479dfd1c3724ec2a4f8fd2256e7c26a&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
// this.setState({loading:true})      
// let data= await fetch(url);
//       let parsedData=await data.json()
//       //console.log(parsedData);
//       this.setState({
//         page:this.state.page-1,
//           articles:parsedData.articles,
//         loading:false})
this.setState({page:this.state.page-1});
this.UpdateNews();
  }
  handleNextClick= async()=>{
    // console.log("Next");
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

    
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d479dfd1c3724ec2a4f8fd2256e7c26a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})  
    // let data= await fetch(url);
    //   let parsedData=await data.json()
    // //   console.log(parsedData);
    
    //   this.setState({
    //     page:this.state.page+1,
    //       articles:parsedData.articles,
    //       loading:false})
    // }
    this.setState({page:this.state.page+1});
    this.UpdateNews()

}
fetchMoreData = async () => {
   this.setState({page:this.state.page+1})
   const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d479dfd1c3724ec2a4f8fd2256e7c26a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
     
      let data= await fetch(url);
      let parsedData=await data.json()
      console.log(parsedData);
      this.setState({
          articles:this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
   })
  };

  render() {
    //   console.log("render")
    return (
      <>
          <h1 className="text-center" style={{margin: '90px 35px 0px'}}>Daily top news from {this.capitalize(this.props.category)} </h1>
          {/* {this.state.loading && <Spinner/>} */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>}>
        <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0, 45):""}
                  description={element.description?element.description.slice(0, 88):""}
                  Url={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disable={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; previous</button>
        <button disable={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
            
        </div> */}
    </>
    );
  }
}

export default News;
