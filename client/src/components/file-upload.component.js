import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

export default class FilesUploadComponent extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            file: '',
            user_id: this.props.user,
            user_name: this.props.name,
            status: ''
        }
    }

    onFileChange(e) {
        
        this.setState({ file: e.target.files })
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        const fileArr = Array.from(this.state.file);
        fileArr.forEach(file => {
            console.log(file)
            formData.append('files', file);
        });
        // formData.append('files', fileArr)
        // formData.append('file', this.state.file)
        formData.append('user_id', this.state.user_id)
        formData.append('user_name', this.state.user_name)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        //axios.post("https://maglab.herokuapp.com/upload", formData, config, {
        axios.post("http://localhost:8080/upload", formData, config, {
        }).then(res => {
            console.log(res)
            this.setState({ status: res.data.message})
        })
    }


    render() {
        const {status} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} multiple/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                        <p>
                            {status}
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}