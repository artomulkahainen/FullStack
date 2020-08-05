import React, { useState, useEffect } from 'react';
import blogService from '../../services/blogs';
import Blog from '../../components/Blog/Blog';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Notification from '../../components/Notification/Notification';

const Blogs = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const createBlogHandler = (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };
    try {
      blogService.create(newBlog);
      setBlogs(blogs.concat(newBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
      setNotificationMessage({
        type: 'Success',
        message: `A new blog: ${newBlog.title} by ${newBlog.author} was added!`,
      });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationMessage({
        type: 'Error',
        message: 'Something went wrong with creating a blog',
      });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const createNew = (
    <div style={{ margin: '30px 0 30px 0' }}>
      <h3>Create new blog entry</h3>
      <form onSubmit={createBlogHandler}>
        <Input
          name='title:'
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <Input
          name='author:'
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Input
          name='url:'
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button type='submit' text='Create' />
      </form>
    </div>
  );

  return (
    <div style={{ marginTop: '30px' }}>
      {notificationMessage ? (
        <Notification
          type={notificationMessage.type}
          message={notificationMessage.message}
        />
      ) : null}
      {user !== null ? createNew : null}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
