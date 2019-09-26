import React from 'reactn';
import { MentionsInput, Mention } from 'react-mentions'

const Input = ({value}) => {
    return <MentionsInput value={this.state.value} onChange={this.handleChange}>
            <Mention
                trigger="@"
                data={this.props.users}
                renderSuggestion={this.renderUserSuggestion}
            />
            <Mention
                trigger="#"
                data={this.requestTag}
                renderSuggestion={this.renderTagSuggestion}
            />
        </MentionsInput>
}

export default Input;