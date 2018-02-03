import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Post from '../../components/Post/Post'
// import FullPost from '../../components/FullPost/FullPost'
// import NewPost from '../../components/NewPost/NewPost'
import Posts from './Posts/Posts'
import asyncComponent from '../../HOC/asyncComponent'
// import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'
import './Blog.css'

const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost')
})

class Blog extends Component {
  state = {
    auth: false
  }
    render(){

        return(
            <div>
                <header className='Blog'>
                    <nav>
                        <ul>
                          <li>
                            <NavLink
                                  to='/'
                                  exact
                                  activeClassName='my-active'
                                  activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                  }}>
                                  Home
                              </NavLink>
                            </li>
                          <li>
                            <NavLink to={{  pathname: '/new-post'  }}>
                              New Post
                            </NavLink>
                          </li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path='/' render={() => <Posts />}/>  The same syntax as below but React Router has a built in component prop*/}
                <Switch>
                  <Route path='/' exact component={ Posts }/>
                  {/* An option using guard syntax to render certain componenets  */}
                  {/* {this.state.auth ?  <Route path='/new-post' component={ NewPost }/> : null } */}
                  <Route path='/new-post' component={ AsyncNewPost }/> 
                  <Route path='/:id' exact component={ FullPost }/>
                  {/*  Redirect can be used to redirect the user to a specific url*/}
                  {/* <Redirect from='/' to='/new-posts' /> */}
                </Switch>
            </div>
        )
    }
}

export default Blog
