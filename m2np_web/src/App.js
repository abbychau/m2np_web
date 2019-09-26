import React, { useGlobal } from 'reactn'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Timeline } from "./Timeline"

class App extends React.PureComponent {

    componentDidMount() {
        this.setGlobal(
            fetch("https://m2np.com/api/users/subscribed")
                .then(res => res.json())
                .then((res) => ({
                    users: res.reduce((map, obj) => {
                        map[obj.id] = obj
                        console.log(map)
                        return map
                    }, {})
                })
                )
                .catch((e) => { console.log(e) })
        )
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
                    <div>{JSON.stringify(this.global.users)}</div>
                    <Route exact path="/" component={Home} />
                    <Route path="/u" component={UserPage} />
                    <Route path="/topics" component={Topics} />
                    <Route path="/timeline" component={Timeline} />
                </div>
            </Router>
        );
    };
}

function syncFetch(url) {
    var data;
    (async () => {
        const s2 = await fetch(url);
        data = await s2.json()
    })()
    return data
}
const Home = () => <h2>Home2</h2>
const UserPage = (match) => {
    console.log(match)
    var s2 = syncFetch(`https://m2np.com/api/user/1`);
    return <div>{JSON.stringify(s2)} </div>

}
class User extends React.Component {
    state = {
        posts: []
    }
    constructor(p) {
        super(p)
        // const [globalState, globalActions] = useGlobal();

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