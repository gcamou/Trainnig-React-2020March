import React, { Component } from "react";
import axios from 'axios'
import { Route } from "react-router-dom";

import Post from '../../../components/Post/Post';
import './styles.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts')
            .then(resp => {
                const posts = resp.data.slice(0, 4);
                const newPost = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({ posts: newPost })
            })
            .catch(err => {
                console.log(err);
                //this.setState({ error: err });
            });
    }

    postSelectedHandler = id => {
        this.props.history.push('/posts/' + id);
    };

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Somethings was wrong...!</p>

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                )
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;