import React, { Component } from 'react'

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: 'af91e34d17ea18de5835',
            clientSecret: 'bbd8db079ff41503c85ae9953126c42bfac9fb3d',
            count: 5,
            sort: 'created: asc',
            repos: []
        }
    }
    componentDidMount() {
        const { portfolio } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;
        if (portfolio !== null) {
            fetch(`https://api.github.com/users/${portfolio}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
                .then(res => res.json())
                .then(data => {
                    this.setState({ repos: data });
                })
                .catch(err => console.log(err));
        }
    }
    render() {
        const { repos } = this.state;
        let repoItems;
        if (repos.length === 0 || repos.length === undefined) {
            repoItems = (
                <div className="card card-body mb-2">
                    <p>Không tìm thấy link github <b>https://github.com/</b>{this.props.portfolio}</p>
                </div>
            )
        } else {
            repoItems = repos.map(repo => (
                <div key={repo.id} className="suggestion-usd">
                    <div className="sgt-text">
                        <h4><a href={repo.html_url}>{repo.name}</a> -  <span className="badge badge-info mr-1 text-white">Stars: {repo.stargazers_count}</span></h4>
                        <span>{repo.description}</span>
                    </div>
                </div>
            ))
        }
        return (
            <div>
                <div className="suggestions-list">
                    {repoItems}
                    {repos.length === 0 ? null : (
                        <div className="view-more">
                            <a href={`https://github.com/` + this.props.portfolio} target="_blank" rel="noopener noreferrer">Xem thêm</a>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
export default Portfolio;
