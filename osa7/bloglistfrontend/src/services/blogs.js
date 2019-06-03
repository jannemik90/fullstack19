
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (updatedObject, id) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, updatedObject, config)
  return response.data
}

const addComment = async (updatedObject, id) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${id}/comments`
  const response = await axios.post(url, updatedObject, config)
  return response.data
}

const remove = async(id) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${id}`
  const deleted = await axios.delete(url, config)
  return deleted
}

export default { getAll, create, setToken, addLike, remove, addComment }