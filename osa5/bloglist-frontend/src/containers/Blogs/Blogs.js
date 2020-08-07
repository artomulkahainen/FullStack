import React, { useState, useEffect, useRef } from 'react';
import blogService from '../../services/blogs';
import Blog from '../../components/Blog/Blog';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Notification from '../../components/Notification/Notification';
import Togglable from '../Togglable/Togglable';

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(
          blogs.sort((blog1, blog2) => (blog1.likes > blog2.likes ? -1 : 1))
        )
      );
  }, []);

  const createBlogHandler = (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };
    try {
      blogFormRef.current.toggleVisibility();
      blogService
        .create(newBlog)
        .then((returnedBlog) => setBlogs(blogs.concat(returnedBlog)));
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

  const likesAddHandler = (id, object) => {
    const newObject = object;
    newObject.likes++;
    console.log(newObject);
    try {
      setBlogs(
        blogs.map((blog) => (blog.id === id ? (blog = newObject) : blog))
      );
      blogService
        .update(id, newObject)
        .then((returnedObject) => (object = returnedObject));
    } catch {
      setNotificationMessage({
        type: 'Error',
        message: 'Something went wrong with adding like',
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
          name="title:"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <Input
          name="author:"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Input
          name="url:"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button type="submit" text="Create" />
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
      {user !== null ? (
        <Togglable
          ref={blogFormRef}
          buttonText2="Cancel"
          buttonText1="Create blog"
        >
          {createNew}
        </Togglable>
      ) : null}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} likeAdd={likesAddHandler} />
      ))}
    </div>
  );
};

export default Blogs;
