import React from 'react';
import './SchedulerEvent.css'

export class SchedulerEvent extends React.Component {
  render() {
    return <div>
      {this.props.event.data.text}
      <div className={"event-icon-right"} onClick={this.iconClicked}>X</div>
    </div>;
  }

  iconClicked = () => {
    if (typeof this.props.onIconClick === "function") {
      this.props.onIconClick(this.props.event);
    }
  }
}
