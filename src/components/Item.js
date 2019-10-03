import React from 'react';

export class Item extends React.PureComponent{
  render() {
    const {data}= this.props
    return (
      <div className="card" >
        {data.thumbnail !== "self" && <img src={data.thumbnail} className="card-img-top" alt=""/>}
        <div className="card-body">
          <h5 className="card-title">{data.title}</h5>
          <p className="card-text">Number of comments: {data.num_comments}</p>
          <a
            href={`https://www.reddit.com${data.permalink}`}
            className="card-link"
            target="_blank"
            rel="noopener norefferer"
          >
            Link
          </a>
        </div>
      </div>
    );
  }
};

