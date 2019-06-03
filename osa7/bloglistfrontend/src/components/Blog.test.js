import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

const blog = {
  title: 'test title',
  author: 'test author',
  url: 'www.testurl.fi',
  likes: 12,
  user: { username: 'testuser' }
}

it('blog shows first only the title and the author', async() => {
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).not.toHaveTextContent('Lisännyt test author')
  expect(component.container).not.toHaveTextContent('12 tykkäykset')
  expect(component.container).not.toHaveTextContent('www.testurl.fi')
  expect(component.container).toHaveTextContent('test title kirjoittajalta test author')

})

it('blog shows all when clicked', async() => {
  const component = render(
    <Blog blog={blog} />
  )


  const div = component.container.querySelector('.mainBlog')
  fireEvent.click(div)


  expect(div).toHaveTextContent('test title kirjoittajalta test author')
  expect(div).toHaveTextContent('12 tykkäykset')
  expect(div).toHaveTextContent('www.testurl.fi')
})
