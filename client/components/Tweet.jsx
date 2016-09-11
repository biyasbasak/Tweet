import React, {Component, PropTypes} from 'react';
class Tweet extends Component {
    render() {
        return (
            <div className="card tweet-block">
            <div className="card-content tweet-block">
            <p id="tweet">{this.props.tweet.tweet}</p>
            </div>
            </div>
        );
    }
}

Tweet.propTypes = {
    tweet: PropTypes.object.isRequired
};


export default Tweet;
