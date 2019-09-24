import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>

                <Route exact path="/" component={Home} />
                <Route path="/u" component={User} />
                <Route path="/topics" component={Topics} />
            </div>
        </Router>
    );
}

const Home = () => <h2>Home2</h2>
class User extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        fetch(`http://www.reddit.com/r/${this.props.params.id}.json`)
        .then(res => res.json())
        .then(res => {
            const posts = res.data.children.map(obj => obj.data);
            this.setState({ posts });
        }
        
        
        );
    }

    render() {
        return (
        <div>
            <h1>{`/r/${this.props.params.id}`}</h1>
            <ul>
            {this.state.posts.map(post =>
                <li key={post.id}>{post.title}</li>
            )}
            </ul>
            <Link to={`/components`}>Components</Link><br />
        </div>
        );
    }
}
const Topic = ({ match }) => <h2>T: {match.params.id}</h2>

function Topics({ match }) {
    return (
        <div>
            <Link to={`${match.url}/components`}>Components</Link><br />
            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>

            <Route path={`${match.path}/:id`} component={User} />
            <Route
                exact
                path={match.path}
                render={() => <h3>Please select a topic.</h3>}
            />
        </div>
    );
}

export default App;