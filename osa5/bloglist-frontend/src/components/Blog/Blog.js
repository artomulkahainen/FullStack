import React from 'react';
import uniqid from 'uniqid';

const Blog = ({ blog }) => (
  <div key={uniqid}>
    {blog.title} {blog.author}
  </div>
);

export default Blog;
