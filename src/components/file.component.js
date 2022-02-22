import React, { Component } from "react";
import AuthService from "../services/auth.service";
import FilesUploadComponent from '../components/file-upload.component';
import axios from 'axios';

 import Plot from '../components/plot.component';

export default class File extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      file: [],
      status: false,
      selectedFile: null,
    };
  }

  async componentDidMount() {
    const article = { "user_id": this.state.currentUser.id };
      //await axios.post('https://maglab.herokuapp.com/files', article, {
      await axios.post('http://localhost:8080/files', article, {
      headers: {
        'Content-Type': 'application/json'
      }})
    .then(result => {
      this.setState({
        file: result.data,
        status: true
      });
    });
  }

  render() {
    const { currentUser } = this.state;
    const { file } = this.state;

    if(this.state.status === false){
      return(
        <h3>Loading...</h3>
      );
    }else{
    return (
        <div className="container">
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Files
            </h3>
          </header>
          <p>
            <strong>Id:</strong>{" "}
            {currentUser.id}
          </p>
          <p>
            Total files: {file.length}
          </p>
          <ul>
          {file.map((d) => 
            <li key={d.name}>
               <button 
                  onClick={() => this.setState({
                    selectedFile:d.name
                })}>{d.name}</button> <a href={d.url} target="_blank" rel="noreferrer">download</a>
            </li>)}
          </ul>
          <div className="App">
          <FilesUploadComponent user={currentUser.id} name={currentUser.username}  />
          {!!this.state.selectedFile && (<Plot user_id={this.state.selectedFile}/>)}
          </div>
        </div>
        
      );
    }
  }
}
