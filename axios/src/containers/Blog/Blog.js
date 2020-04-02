import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
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
                this.setState({ error: err });
            });
    }

    postSelectedHandler = id => {
        this.setState({ selectedPostId: id })
    };

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Somethings was wrong...!</p>

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;