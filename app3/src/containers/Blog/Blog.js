import React, { Component } from 'react';

import Post from '../../components/Post/Post'
// import FullPost from '../../components/FullPost/FullPost'
// import NewPost from '../../components/NewPost/NewPost'
import Posts from '../../containers/Blog/Posts/Posts'
import './Blog.css'

class Blog extends Component {

    render(){

        return(
            <div>
                <header className='Blog'>
                    <nav>
                        <ul>
                          <li><a href='/'>Home</a></li>
                          <li><a href='/new-posts'>New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <Posts />
            </div>
        )
    }
}

export default Blog
