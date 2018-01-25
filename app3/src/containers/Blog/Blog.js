import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post'
import FullPost from '../../components/FullPost/FullPost'
import NewPost from '../../components/NewPost/NewPost'
import './Blog.css'

class Blog extends Component {
    state = {
        posts: [],
        selectedPostID: null
    }

    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
            // this will concat the array of posts to the first 4 posts
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return{
                    ...post,
                    author: 'Adrian'
                }
            })
            this.setState({ posts: updatedPosts })
            })
    }

    postSelected = (id) => {
        this.setState({selectedPostID: id})
    }

    render(){
        const posts = this.state.posts.map(post => {
            return (
            <Post 
                clicked={() => this.postSelected(post.id)}
                key={post.id}
                title={post.title} 
                author={post.author}
            />)
        })

        return(
            <div>
                <section>
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostID}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        )
    }
}

export default Blog