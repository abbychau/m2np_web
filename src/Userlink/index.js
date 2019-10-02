import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import React from 'reactn';
import { Manager, Reference, Popper } from 'react-popper';
import {
  Main,
  ReferenceBox,
  ClickableReferenceBox,
  PoppersContainer,
  TransitionedPopperBox,
  PopperBox,
  Arrow,
  PopperDot,
} from './styles';

class Userlink extends React.Component {
    state = {
        isOpen:false
    }

    render() {

        return (
            <Manager>
                <Reference>
                    {({ ref }) => (
                        <span onClick={()=>this.setState({isOpen:!this.state.isOpen})} ref={ref}>[a]
                        </span>
                    )}
                </Reference>
                
                {this.state.isOpen &&
                <Popper placement="right">
                    {({ ref, style, placement, arrowProps }) => (
                        <PopperBox ref={ref} style={style} data-placement={placement}>
                            <Link to={`/u/${this.global.users[this.props.userId].username}`} style={{ color: "blue" }}>{this.global.users[this.props.userId].display_name}</Link>
                            <Arrow
                                innerRef={arrowProps.ref}
                                data-placement={placement}
                                style={arrowProps.style}
                            />
                        </PopperBox>
                    )}
                </Popper>
                }
            </Manager>
        )
    }
}

export default Userlink
