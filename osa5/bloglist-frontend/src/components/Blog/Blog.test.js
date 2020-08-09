import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  author: 'Pertti',
  title: 'Jepajee',
  url: 'hotmail.com',
  likes: 3,
  user: {
    name: 'Artzi',
    username: 'artzii',
  },
}

test('Test renders only blog title when button is not fired', () => {
  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent(blog.title)
})

test('Test renders everything when button is fired', () => {
  const component = render(<Blog blog={blog} />)

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(blog.likes)
})

test('When like button is pressed twice, call it twice', async () => {
  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} likeAdd={mockHandler} />)

  const view = component.getByText('view')
  fireEvent.click(view)

  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
