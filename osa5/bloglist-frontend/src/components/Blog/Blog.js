import React from 'react';
import uniqid from 'uniqid';
import Togglable from '../../containers/Togglable/Togglable';
import classes from './Blog.module.css';
import Button from '../Button/Button';

const Blog = ({ blog, likeAdd, user, deleteBlog }) => {
  const like = (blogId, blog) => {
    likeAdd(blogId, blog);
    return true;
  };

  const showAll = (
    <div key={uniqid}>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}{' '}
        <Button text="Like" clicked={() => like(blog.id, blog)} />
      </p>
      <p>{blog.author}</p>
      <Button text="Remove" clicked={() => deleteBlog(blog)} />
    </div>
  );
  return (
    <div className={classes.Blog} key={uniqid}>
      <p>{blog.title}</p>
      <Togglable buttonText2="hide" buttonText1="view">
        {showAll}
      </Togglable>
    </div>
  );
};

export default Blog;
