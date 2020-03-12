import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";

class Scheduler extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timeHeaders: [{"groupBy": "Month"}, {"groupBy": "Day", "format": "d"}],
      scale: "Day",
      days: 92,
      startDate: "2019-10-01",
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: (args) => {
        var dp = this;
        DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function (modal) {
          dp.clearSelection();
          if (!modal.result) {
            return;
          }
          dp.events.add(new DayPilot.Event({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            resource: args.resource,
            text: modal.result
          }));
        });
      },
      onBeforeEventRender: args => {
        args.data.areas = [
          {right: 25, top: 10, width: 17, height: 17, image: "delete-17.svg", onClick: args => this.deleteEvent(args.source)}
        ];
      },
      onBeforeEventDomAdd: args => {
        args.element = <div>
          {args.e.data.text}
          <div style={{position: "absolute", right: "5px", top: "9px", width: "17px", height: "17px"}}
               onClick={() => this.deleteEvent(args.e)}><img src={"delete-17.svg"} alt={"Delete icon"}/></div>
        </div>;
      },
      treeEnabled: true,
    };
  }

  deleteEvent(e) {
    this.scheduler.events.remove(e);
  };

  componentDidMount() {

    this.scheduler.scrollTo("2019-11-01");

    // load resource and event data
    this.setState({
      resources: [
        {name: "Resource A", id: "A"},
        {name: "Resource B", id: "B"},
        {name: "Resource C", id: "C"},
        {name: "Resource D", id: "D"},
        {name: "Resource E", id: "E"},
        {name: "Resource F", id: "F"},
        {name: "Resource G", id: "G"},
        {name: "Resource H", id: "H"}
      ],
      events: [
        {
          id: 1,
          text: "Event 1",
          start: "2019-11-02T00:00:00",
          end: "2019-11-05T00:00:00",
          resource: "A"
        },
        {
          id: 2,
          text: "Event 2",
          start: "2019-11-03T00:00:00",
          end: "2019-11-10T00:00:00",
          resource: "C",
          barColor: "#38761d",
          barBackColor: "#93c47d"
        },
        {
          id: 3,
          text: "Event 3",
          start: "2019-11-02T00:00:00",
          end: "2019-11-08T00:00:00",
          resource: "D",
          barColor: "#f1c232",
          barBackColor: "#f1c232"
        },
        {
          id: 4,
          text: "Event 3",
          start: "2019-11-02T00:00:00",
          end: "2019-11-08T00:00:00",
          resource: "E",
          barColor: "#cc0000",
          barBackColor: "#ea9999"
        }
      ]
    });

  }

  render() {
    var {...config} = this.state;
    return (
      <div>
        <DayPilotScheduler
          {...config}
          ref={component => {
            this.scheduler = component && component.control;
          }}
        />
      </div>
    );
  }
}

export default Scheduler;
