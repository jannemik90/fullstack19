const blogs = [
  {
    likes: 19,
    title: 'Testi titteli',
    author: 'Testi authori',
    url: 'linkki6',
    user: {
      username: 'username2',
      name: 'name2',
      id: '5ce7feb64d556d4b3805949b'
    },
    id: '5ce812d2b8980c0518769bb9'
  },
  {
    likes: 218,
    title: 'Testi titteli2',
    author: 'Testi authori2',
    url: 'linkki62',
    user: {
      username: 'username2',
      name: 'name2',
      id: '5ce7feb64d556d4b3805949b'
    },
    id: '5ce81304baccef2e1c93e939'
  },
  {
    likes: 90,
    title: 'Testi titteli3',
    author: 'Testi authori3',
    url: 'linkki61',
    user: {
      username: 'username2',
      name: 'name2',
      id: '5ce7feb64d556d4b3805949b'
    },
    id: '5ce81483ce5aa54638c8b4ed'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken= (token) => {
  console.log(token)
}

export default { getAll, setToken }