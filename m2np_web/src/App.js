import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Timeline } from "./Timeline";
import useGlobal from "./store";

class App extends React.Component {

    constructor(props) {
        super(props);
        fetch("https://m2np.com/api/users/123")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: this.state.isLoaded + 1,
                    users: result.reduce((map, obj) => {
                        map[obj.id] = obj.display_name
                        return map
                    }, {})

                });
            }, (error) => {
                this.setState({
                    isLoaded: this.state.isLoaded + 1,
                    error
                });
            }

            );
    }

    render() {
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
                        <li>
                            <Link to="/timeline">Timeline</Link>
                        </li>
                    </ul>

                    <Route exact path="/" component={Home} />
                    <Route path="/u" component={User} />
                    <Route path="/topics" component={Topics} />
                    <Route path="/timeline" component={Timeline} />
                </div>
            </Router>
        );
    };
}

const Home = () => <h2>Home2</h2>
const UserPage = (match)=>{
    console.log(match)
    const s = useGlobal()[0];
    return <div>{JSON.stringify(s.users)}</div>

}
class User extends React.Component {
    state = {
        posts: []
    }
    constructor(p){
        super(p)
          const [globalState, globalActions] = useGlobal();

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