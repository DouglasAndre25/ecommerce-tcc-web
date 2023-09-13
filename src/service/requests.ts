import { HTTP_METHODS_TYPE, HttpMethods } from './requestConstants'

interface ApiPublicRequestParams {
  url: string
  method?: HTTP_METHODS_TYPE
  body?: any
  headers?: Headers
}

export const apiPublicRequest = async ({
  url,
  body,
  method = HttpMethods.GET,
  headers = new Headers(),
}: ApiPublicRequestParams) => {
  const { REACT_APP_API_URL } = process.env
  const endpoint = `${REACT_APP_API_URL}${url}`

  headers.append('Content-Type', 'application/json')

  const options = {
    headers,
    method,
    body: JSON.stringify(body),
  }

  return await fetch(endpoint, options)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
