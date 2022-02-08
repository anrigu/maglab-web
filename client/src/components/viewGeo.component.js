import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={4} defaultCenter={{ lat: 42.3314, lng: -83 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            onClick={onClick}
            position={{ lat: marker.lat, lng: marker.long }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  <p>{marker.lat},{marker.long}</p>
                  
                {marker["users"].map(each => {
                  return (
                    <div>
                    <p>User: {each.user_name}</p>
                    {each["files"].map(file => {
                    return (
                      <p>{file.file_url}</p>
                    )})}
                    </div>
                    
                  )
                })}
                
                  
                </div>
              </InfoWindow>}
              
    
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default class ShelterMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      selectedMarker: false
    }
  }
  
  componentDidMount() {
    fetch("http://localhost:8080/browse")
      .then(r => r.json())
      .then(data => {
        console.log(data)
        this.setState({ shelters: data })
      })
    // var test = []
    // test.push({id : 1, latitude:29.5, longitude:-95, shelter:"ddd"})
    // test.push({id : 2, latitude:29.4, longitude:-95, shelter:"fff"})
    // this.setState({ shelters: test })
  }
  handleClick = (marker, event) => {
    console.log({ marker })
    this.setState({ selectedMarker: marker })
  }
  render() {
    


    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA7X_zjY40PgPc9RWZYe4c2WSsZonOvidM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `800px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}



// bootstrapURLKeys={{ key: "AIzaSyA7X_zjY40PgPc9RWZYe4c2WSsZonOvidM" }}