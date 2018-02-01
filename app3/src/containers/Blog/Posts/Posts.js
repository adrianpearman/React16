import React, { Component } from 'react';
import Post from '../../../components/Post/Post'
import axios from 'axios'
import './Posts.css'

class Posts extends Component{
  state = {
      posts: [],
      // selectedPostID: null,
      // error: false
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
      .catch(err => {
          console.log(err)
          // this.setState({ error: true })
      })
  }

  postSelected = (id) => {
      this.setState({selectedPostID: id})
  }

  render(){
    // establishing error handler for posts
    let posts = <p style={{textAlign: 'center', width: '90%'}}> Something went wrong... </p>
    if (!this.state.error) {
        posts = this.state.posts.map(post => {
           return (
           <Post
               clicked={() => this.postSelected(post.id)}
               key={post.id}
               title={post.title}
               author={post.author}
           />)
       })
    }

    return (
      <section className='PostContainer'>
         {posts}
      </section>
    )
  }
}

export default Posts

{/* <section>
    <FullPost id={this.state.selectedPostID}/>
</section>
<section>
    <NewPost />
</section> */}
