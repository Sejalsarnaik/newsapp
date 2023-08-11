import React from 'react'

const NewsItem = (props)=> {
        let {title, discription, imageUrl, newsUrl, author, date} = props;
        return (
            <div>
                <div className="card">
                    <img src= {imageUrl ? imageUrl : "https://www.zdnet.de/wp-content/themes/korasa-zdnet-de/images/zdnet-logo.png"} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{discription}</p>
                            <p class="card-text"><small class="text-body-secondary">By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsUrl} target='_blanks' className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
}

export default NewsItem;