import React from 'reactn';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import nl2br from 'react-nl2br';


// import styles from './App.css'

function timeDifference(previous) {
  var current = Math.floor(Date.now() / 1000);
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  }

  else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  }

  else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  }

  else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  }

  else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  }

  else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
}
export class Timeline extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: 0,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://m2np.com/api/timeline/1/0")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {items.map((item,k) => (
            <div key={item.id} style={{background: k%2?"#EEE":"none" }}>
              {nl2br(item.json.post)}
              <Link to={`/u/${this.state.username}`} style={{color:"red"}}>{this.global.users[item.user_id].username}</Link> @ <span>{timeDifference(item.json.created_at / 1000)}</span>
            </div>
          ))}

        </div>
      );
    }
  }
}