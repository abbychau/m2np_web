import React from 'reactn';
import { MentionsInput, Mention } from 'react-mentions'

import { provideExampleValue } from './higher-order'

import defaultStyle from './defaultStyle'
import myStyle from './myStyle'

function fetchUsers(query, callback) {
  if (!query) return
  fetch(`https://api.github.com/search/users?q=${query}`, { json: true })
    .then(res => res.json())

    // Transform the users to what react-mentions expects
    .then(res =>
      res.items.map(user => ({ display: user.login, id: user.login }))
    )
    .then(callback)
}

function AsyncUserMentions({ value, data, onChange }) {
  return (
    <div className="async">

      <MentionsInput
        value={value}
        onChange={onChange}
        style={defaultStyle}
        placeholder="What are you thinking?"
      >
        <Mention
          displayTransform={login => `@${login}`}
          trigger="@"
          data={fetchUsers}
          style={myStyle.mention}
        />
        <Mention
          displayTransform={x => `#${x}`}
          trigger="#"
          style={myStyle.hashtag}
        />
      </MentionsInput>
    </div>
  )
}

const asExample = provideExampleValue('')

export default asExample(AsyncUserMentions)
