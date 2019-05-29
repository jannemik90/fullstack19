import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

const blog = {
  title: 'test title',
  author: 'test author',
  url: 'www.testurl.fi',
  likes: 12
}

test('renders title author and likes', () => {

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'test title'
  )

  expect(component.container).toHaveTextContent(
    'test author'
  )

  const div = component.container.querySelector('.likes')
  expect(div).toHaveTextContent('blog has 12 likes')
})

it('clicking the button two times calls event handler twice', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = component.container.querySelector('.likes button')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})