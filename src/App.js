import React, { useGlobal } from 'reactn'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Timeline from "./Timeline"
import Navbar from "./Navbar"
import AsyncUserMentions from "./Input/AsyncUserMention"

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
        console.log(this.global)
    }

    render() {
        return (
            <Router>
                <div>
                <div>
  <h2>Scroll Down</h2>
  <p>Scroll down to see the sticky effect.</p>
</div>
                    <Navbar />
                    <AsyncUserMentions  style={{zIndex:-10,position: 'relative'}} />
                    <Route exact path="/" component={Home} />
                    <Route path="/u" component={UserPage} />
                    <Route path="/users" component={Users} />
                    <Route path="/timeline" component={Timeline} />
                </div>
            </Router>
        );
    }
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
    return <div>USER: {JSON.stringify(s2)} </div>

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

function Users({ match }) {
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