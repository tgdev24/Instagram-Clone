// src/components/Post/index.js
import React, { Component } from "react";
import "./Post.css";

class Post extends Component {
  render(){
    const image = this.props.image;
    const caption = this.props.caption;
    const avatar = this.props.avatar;
    const nickname = this.props.nickname;
    return (
      <article className="Post" ref="Post">
      <header>
      <div className="Post-user">
      <div className="Post-user-avatar">
      <img src={avatar} alt={nickname} />
      </div>
      <div className="Post-user-nickname">
      <span>{nickname}</span>
      </div>
      </div>
      </header>
      <div className="Post-image">
      <div className="Post-image-bg">
      <img alt={caption} src={image} />
      </div>
      </div>
      <div className="Post-caption">
      <strong>{nickname}</strong> {caption}
      </div>
      </article>
      );
  }
}
export default Post;