import React from 'react'
import 'jest-dom/extend-expect'
import { render,  waitForElement, cleanup } from 'react-testing-library'
import App from './App'
jest.mock('./services/blogs')

afterEach(cleanup)



it('renders login button and title and nothing more', async () => {
  const component = render(<App />)

  component.rerender(<App />)
  await waitForElement(
    () => component.container.querySelector('button')
  )

  expect(component.container).toHaveTextContent('Kirjaudu sisään')
  expect(component.container).not.toHaveTextContent('Blogs')
})

it('renders all blogs from backend', async () => {
  const user = {
    username: 'testuser',
    token: '1231231214',
    name: 'Teme Testaaja'
  }
  localStorage.setItem('loggedUser', JSON.stringify(user))
  console.log('testataan')
  const component = render(
    <App />
  )
  component.rerender(<App />)
  await waitForElement(
    () => component.container.querySelector('.mainBlog')
  )

  const blogs = component.container.querySelectorAll('.mainBlog')
  expect(blogs.length).toBe(3)

  expect(component.container).toHaveTextContent(
    'Testi titteli'
  )
  expect(component.container).toHaveTextContent(
    'Testi titteli2'
  )
  expect(component.container).toHaveTextContent(
    'Testi titteli3'
  )
})


