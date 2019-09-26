import React from 'reactn';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import nl2br from 'react-nl2br';
import Autolinker from 'autolinker';

function nl2br(str, is_xhtml) {
  if (typeof str === 'undefined' || str === null) {
    return '';
  }
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
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
    if (!this.global.users) {
      return <div>Loading...</div>;
    } else {
      var autolinker = new Autolinker({
        url:true,mention:'instagram',hashtag:'instagram',
        replaceFn: function (match) {

          switch (match.getType()) {
            case 'url':
              return true;  // let Autolinker perform its normal anchor tag replacement

            case 'mention':
              return '<a href="https://m2np.com/u/' + match.getMention() + '"/>@' +  match.getMention() + '</a>';

            case 'hashtag':
              return '<a href="https://m2np.com/hashtag/' + match.getHashtag() + '"/>#' +  match.getHashtag() + '</a>';

            default:
              // do nothing
          }
        }
      });
      return (
        <div>
          {this.state.items.map((item, k) => (
            this.global.users[item.user_id] ?
              <div key={item.id} style={{ background: k % 2 ? "#EEE" : "none", padding: "0.5em" }}>
                <div style={{ background: "none" }} dangerouslySetInnerHTML={{ __html: nl2br(autolinker.link(item.json.post)) }} />
                <div>
                {item.json.attachments ?
                  item.json.attachments.map((attm, k2) => (
                    attm.media
                      ? attm.media[0].uri.slice(-3) === "mp4"
                        ? <video src={`https://cdn0.m2np.com/file/kiyomi/45b514b70182fa447d4d302b819e5bcd/${attm.media[0].uri}`} style={{ maxWidth: 100, maxHeight: 100 }} />
                        : <img src={`https://cdn0.m2np.com/file/kiyomi/45b514b70182fa447d4d302b819e5bcd/${attm.media[0].uri}`} title={attm.media[0].title} alt={attm.media[0].description} style={{ maxWidth: 100, maxHeight: 100 }} />
                      : null
                        +
                        attm.text
                        ? <span style={{ fontWeight: "bold" }}>{attm.text}</span>
                        : null
                          +
                          attm.external_link
                          ? <a href={attm.external_link} title={attm.created_at} target="blank">{attm.external_link}</a>
                          : null
                  ))
                  : !item.json.attachments && !item.json.post && !item.json.external_link
                    ? <div>XDEBUG:{JSON.stringify(item.json)}</div>
                    : null
                }
                </div>
                <div>
                ~ <Link to={`/u/${this.global.users[item.user_id].username}`} style={{ color: "red" }}>{this.global.users[item.user_id].display_name}</Link> @ <span>{timeDifference(item.json.created_at / 1000)}</span>
                </div>

              </div>
              : <div>Loading...</div>
          ))}

        </div>
      );
    }
  }
}