import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
      items: [],
      users: []
    };
  }

  componentDidMount() {
    fetch("https://m2np.com/api/timeline/1/0")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: this.state.isLoaded + 1,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: this.state.isLoaded + 1,
            error
          });
        }
      )

  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoaded < 2) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {items.map(item => (
            <p key={item.id}>
              {item.json.post}  <Link to={`/u/${this.state.username}`} style={{color:"red"}}>{this.state.users[item.user_id]}</Link> @ <span>{timeDifference(item.json.created_at / 1000)}</span>
            </p>
          ))}

        </div>
      );
    }
  }
}