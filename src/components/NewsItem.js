import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, Url, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
            <div style={{display:'flex', justifycontent:'flex-end',position:'absolute', right:'0'}}>
            <span className=" badge rounded-pill bg-danger">
                {source}
               
              </span>

            </div>
        
              {/* <span className=" badge rounded-pill bg-danger" style={{left:'93%', zIndex:'1'}}>
                {source}
               
              </span> */}
          {/* <img src={!imageUrl?"https://static01.nyt.com/images/2022/02/25/science/25sci-venus-promo/25sci-venus-promo-facebookJumbo-v2.jpg" :imageUrl} 
       className="card-img-top" alt="..."/> */}

          <img src={Url} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-danger">
                {" "}
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
