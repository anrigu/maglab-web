import React, { Component } from 'react';
import Chart from "react-apexcharts";
const json = require('./data.json');
//import {XYPlot, LineSeries} from 'react-vis';


export default class Plot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: this.props.user_id
        }

        console.log(json)

        // var start_date = new Date('2021-01-15T00:16:26.544094Z')
        // console.log(this.state.user_id)
        // var Bx = [];
        // // Bx.push({x:new Date('2021-01-15T00:16:26.544094Z') , y:-635});
        // // Bx.push({x:new Date('2021-01-15T00:16:27.544094Z') , y:-637});
        // // Bx.push({x:new Date('2021-01-15T00:16:28.544094Z') , y:-634});
        // // Bx.push({x:new Date('2021-01-15T00:16:29.544094Z') , y:-638});
        // // Bx.push({x:new Date('2021-01-15T00:16:30.544094Z') , y:-634});
        // // Bx.push({x:new Date('2021-01-15T00:16:31.544094Z') , y:-640});
        // // Bx.push({x:new Date('2021-01-15T00:16:32.544094Z') , y:-633});
        // // Bx.push({x:new Date('2021-01-15T00:16:33.544094Z') , y:-636});
        // // Bx.push({x:new Date('2021-01-15T00:16:34.544094Z') , y:-626});
        // // Bx.push({x:new Date('2021-01-15T00:16:35.544094Z') , y:-633});

        // for(var i=0; i < 5000; i++){
        //     var last = new Date(start_date);
        //     last.setSeconds(last.getSeconds() + i);
        //     Bx.push({x:last, y:(-635 + (i%30))});
        // }


        // var By = [];

        // for(i=0; i < 5000; i++){
        //     last = new Date(start_date);
        //     last.setSeconds(last.getSeconds() + i);
        //     By.push({x:last, y:(1584 + (i%30))});
        // }


        // var Bz = [];
        // Bz.push({x:new Date('2021-01-15T00:16:26.544094Z') , y:-2240});
        // Bz.push({x:new Date('2021-01-15T00:16:27.544094Z') , y:-2238});
        // Bz.push({x:new Date('2021-01-15T00:16:28.544094Z') , y:-2238});
        // Bz.push({x:new Date('2021-01-15T00:16:29.544094Z') , y:-2239});
        // Bz.push({x:new Date('2021-01-15T00:16:30.544094Z') , y:-2239});
        // Bz.push({x:new Date('2021-01-15T00:16:31.544094Z') , y:-2249});
        // Bz.push({x:new Date('2021-01-15T00:16:32.544094Z') , y:-2240});
        // Bz.push({x:new Date('2021-01-15T00:16:33.544094Z') , y:-2240});
        // Bz.push({x:new Date('2021-01-15T00:16:34.544094Z') , y:-2237});
        // Bz.push({x:new Date('2021-01-15T00:16:35.544094Z') , y:-2238});

        this.state = {
          
            series: [{
              data: json.Bx
            }],
            options: {
              chart: {
                id: 'fb',
                group: 'social',
                type: 'line',
                height: 160,
                animations: {
                  enabled: false,
                }
              },
              colors: ['#008FFB'],
              stroke: {
                width: 2
              },
              yaxis: {
                labels: {
                  minWidth: 40
                }
              },
              xaxis: {
                type: 'datetime',
                labels: {
                    format: 'HH:mm:ss',
                }
              },
              tooltip: {
                x: {
                  format: 'HH:mm:ss'
                }
              },
            },
          
            seriesLine2: [{
              data: json.By
            }],
            optionsLine2: {
              chart: {
                id: 'tw',
                group: 'social',
                type: 'line',
                height: 160,
                animations: {
                  enabled: false,
                }
              },
              colors: ['#546E7A'],
              stroke: {
                width: 2
              },
              yaxis: {
                labels: {
                  minWidth: 40
                }
              },
              xaxis: {
                type: 'datetime',
                labels: {
                    format: 'HH:mm:ss',
                }
              }
              
            },
          
            seriesLine3: [{
              data: json.Bz
            }],
            optionsLine3: {
              chart: {
                id: 'yt',
                group: 'social',
                type: 'line',
                height: 160,
                animations: {
                  enabled: false,
                }
              },
              colors: ['#00E396'],
              yaxis: {
                labels: {
                  minWidth: 40
                }
              },
              stroke: {
                width: 2
              },
              xaxis: {
                type: 'datetime',
                labels: {
                    format: 'HH:mm:ss',
                }
              }
            },
            
          
          
          };
        }

        
      

        render() {
          return (
            


      <div id="wrapper">
  <div id="chart-line">
  <Chart options={this.state.options} series={this.state.series} type="line" height={160} />
</div>
  <div id="chart-line2">
  <Chart options={this.state.optionsLine2} series={this.state.seriesLine2} type="line" height={160} />
</div>
  <div id="chart-area">
  <Chart options={this.state.optionsLine3} series={this.state.seriesLine3} type="line" height={160} />
</div>
</div>
    


          );
        }
      }
      