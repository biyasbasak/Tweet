import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Button} from 'react-bootstrap';

import Tweet from './Tweet.jsx';

class App extends Component {
    load() {
        Meteor.call('newTweets');
    }
    renderTweets() {
        return this.props.tweets.map((tweet) => (<Tweet key={tweet._id} tweet={tweet}/>));
    }
    render() {
        return (
            <div className="container">
                <header>
                    <h1>
                        Kamal R Khan Tweets
                    </h1>
                    <Button bsStyle="default" onClick={() => {
                        this.load()
                    }}>Reload</Button>
                </header>
                <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                            {this.renderTweets()}
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    tweets: PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('tweets');
    return {tweets: Tweets.find({}, {
            sort: {
                createdAt: -1
            },
            limit: 10
        }).fetch()};
}, App);
