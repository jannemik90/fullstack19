

describe('Blog app login tests', () => {
  beforeEach( () => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'username10',
      password: 'salasana',
      name:'Testi käyttäjä'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000/')
    cy.contains('Syötä kirjautumistiedot')
    cy.get('#username')
      .type('username10')
    cy.get('#password')
      .type('salasana')
    cy.get('#login')
      .click()
  })

  it('Clicking user opens a list of users blogs', () => {
    cy.get('#usersNavigation')
      .click()
    cy.contains('Blogs created')
  })
  it('Logout button logout user', () => {
    cy.contains('Logout')
      .click()
    cy.contains('Syötä kirjautumistiedot')
  })
  it('It is possible add new blogpost', () => {
    cy.contains('Lisää uusi blogi')
      .click()
    cy.get('#title')
      .type('testititle')
    cy.get('#author')
      .type('testiauthor')
    cy.get('#url')
      .type('www.testiurl.fi')
    cy.get('#submit')
      .click()
    cy.contains('testititle kirjoittajalta testiauthor')
  })
})

describe('Blog app added blog tests', () => {
  beforeEach( () => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'username10',
      password: 'salasana',
      name:'Testi käyttäjä'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000/')
    cy.contains('Syötä kirjautumistiedot')
    cy.get('#username')
      .type('username10')
    cy.get('#password')
      .type('salasana')
    cy.get('#login')
      .click()
    cy.contains('Lisää uusi blogi')
      .click()
    cy.get('#title')
      .type('testititle')
    cy.get('#author')
      .type('testiauthor')
    cy.get('#url')
      .type('www.testiurl.fi')
    cy.get('#submit')
      .click()
    cy.contains('testititle kirjoittajalta testiauthor')
  })
  it('blogpage shows all the details', () => {
    cy.contains('testititle kirjoittajalta testiauthor')
      .click({ force: true })
    cy.contains('testititle kirjoittajalta testiauthor')
    cy.contains('0 tykkäykset')
    cy.contains('Lisää kommentti')
    cy.contains('www.testiurl.fi')
    cy.contains('Ei kommentteja')
  })
  it('it is possible add comments', () => {
    cy.contains('testititle kirjoittajalta testiauthor')
      .click({ force: true })
    cy.get('#comment')
      .type('Uusi kommentti')
    cy.get('#submit')
      .click()
    cy.contains('Uusi kommentti')
  })
  it('it is possible like give like', () => {
    cy.contains('testititle kirjoittajalta testiauthor')
      .click({ force: true })
    cy.get('#likeButton')
      .click()
    cy.contains('1 tykkäykset')
  })
})

