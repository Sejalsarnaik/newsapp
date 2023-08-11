import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

export default class News extends Component {
    static defaultProps = {
        country: "in",
        category: "sports" // Corrected the category name to "sports"
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string // Corrected the propType name to "category"
    }

    constructor() {
        super();
        console.log("I am constructor from News Component");
        this.state = {
            articles: [], // Initialize articles as an empty array
            loading: false,
            page: 1,
            totalResults: 0 // Add totalResults to the initial state
        };
    }

    async componentDidMount() {
        this.props.setProgress(60);
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=961968311882406f83cd521f1399c955&page=1&pageSize=20`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    handlePreviousClick = async () => {
        console.log("previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c94fce4957104c89a7df73b980454ee8&page=${this.state.page - 1}&pageSize=20`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);

        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }

    handleNextClick = async () => {
        console.log("next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c94fce4957104c89a7df73b980454ee8&page=${this.state.page + 1}&pageSize=20`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parseData = await data.json();
            console.log(parseData);

            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            })
        }
    }

    render() {
        return (
            <div className="container mt-3">
                <h2 className='text-center'>NewsTeaTime - Top Headlines</h2>
                <div className='row mt-3'>
                    {this.state.articles.map((element) => {
                        return <div className='col-md-4 mb-3' key={element.url}>
                            <NewsItem
                                title={element.title ? element.title.slice(0, 44) : ""}
                                description={element.description ? element.description.slice(0, 88) : ""}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt}
                            />
                        </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>
                        &larr; Previous
                    </button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
                        Next &rarr;
                    </button>
                </div>
            </div>
        )
    }
}
