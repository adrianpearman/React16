import React, { Component } from 'react';
import axios from 'axios'
import './FullPost.css';

class FullPost extends Component {
    state ={
        loadedPost: null
    }

    componentDidUpdate(){
        if(this.props.id){
            // componentDidupdate willl continue to send network requests, without this 'if' block 
            // this validates the post to insure whether it is loading a new post
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
              axios
                .get(
                  "https://jsonplaceholder.typicode.com/posts/" +
                    this.props.id
                )
                .then(response => {
                  this.setState({ loadedPost: response.data });
                });
            }
        }
    }

    deletePost = () => {
        axios.delete("https://jsonplaceholder.typicode.com/posts/" + this.props.id).then(response => {
            console.log(response)
        })
    }

    render(){
    let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;
    // setting the post elment as we wait for the promise to be completed.
    if(this.props.id){
        post = <p style={{ textAlign: "center" }}> Loading...</p>;
    }
    if(this.state.loadedPost){
        post = <div className="FullPost">
                 <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                            onClick={this.deletePost}className="Delete">
                            Delete
                        </button>
                    </div>
                </div>}
        return post 
    }
}

export default FullPost