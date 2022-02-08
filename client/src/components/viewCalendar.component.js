import React, { Component } from "react";

import CalendarHeatmap from 'reactjs-calendar-heatmap'
import moment from 'moment';
import * as d3 from 'd3'
// Render
export default class viewCalendar extends Component {

  constructor(props) {
    super(props)

    // Initialize random data for the demo
    let now = moment().endOf('day').toDate()
    let time_ago = moment().startOf('day').subtract(10, 'year').toDate()
    let data = d3.timeDays(time_ago, now).map(function (dateElement, index) {
      return {
        date: dateElement,
        details: Array.apply(null, new Array(Math.floor(Math.random() * 15))).map(function(e, i, arr) {
          return {
            'name': 'Project ' + Math.ceil(Math.random() * 10),
            'date': function () {
              let projectDate = new Date(dateElement.getTime())
              projectDate.setHours(Math.floor(Math.random() * 24))
              projectDate.setMinutes(Math.floor(Math.random() * 60))
              return projectDate
            }(),
            'value': 3600 * ((arr.length - i) / 5) + Math.floor(Math.random() * 3600) * Math.round(Math.random() * (index / 365))
          }
        }),
        init: function () {
          this.total = this.details.reduce(function (prev, e) {
            return prev + e.value
          }, 0)
          return this
        }
      }.init()
    })
    // let data = [{
    //   "date": "2021-01-03",
    //   "total": 1,
    //   "details": [{
    //     "location": ["1", "2"],
    //     "url": "maglab.com",
    //     "name": "data1"
    //   }]},
    //   {
    //   "date": "2021-07-04",
    //   "total": 1,
    //   "details": [{
    //     "location": ["1", "2"],
    //     "url": "maglab.com",
    //     "name": "data2"
    //   }]},
    //   {
    //     "date": "2021-05-04",
    //     "total": 1,
    //     "details": [{
    //       "location": ["1", "2"],
    //       "url": "maglab.com",
    //       "name": "data3"
    //     }]}
    // ]
      

    this.state = {
      data: data,
      color: '#cd2327',
      overview: 'year',
    }
  }

  print(val) {
    console.log(val)
  }

  render() {
    return (
      <CalendarHeatmap
        data={this.state.data}
        color={this.state.color}
        overview={this.state.overview}
        handler={this.print.bind(this)}>
      </CalendarHeatmap>
    )
  }
  
}