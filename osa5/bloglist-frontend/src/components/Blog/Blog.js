import React from 'react'
import uniqid from 'uniqid'
import Togglable from '../../containers/Togglable/Togglable'
import classes from './Blog.module.css'
import Button from '../Button/Button'

const Blog = ({ blog, likeAdd, user, deleteBlog }) => {
  const like = (blogId, blog) => {
    likeAdd(blogId, blog)
    return true
  }

  const isOwnBlog = user && blog && blog.user && user.id === blog.user.id

  const showAll = (
    <div key={uniqid}>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}{' '}
        <Button text="Like" clicked={() => like(blog.id, blog)} />
      </p>
      <p>{blog.author}</p>
      {isOwnBlog && <Button text="Remove" clicked={() => deleteBlog(blog)} />}
    </div>
  )

  return (
    <div className={classes.Blog} key={uniqid}>
      <p>{blog.title}</p>
      <Togglable buttonText2="hide" buttonText1="view">
        {showAll}
      </Togglable>
    </div>
  )
}

/*Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeAdd: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}*/

export default Blog
