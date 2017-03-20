import fetch from 'dva/fetch'

function throwError(response, msg) {
  const error = new Error(msg);
  error.response = response;
  throw error;
}

async function getResponseData(response) {
  if (response.status >= 200 && response.status < 300) {
    const data = await response.json();
    if (data && !data.success) {
      throwError(response, data.msg)
    } else {
      return data;
    }
  }

  throwError(response, response.statusText);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  if (!options.headers) {
    options.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  if(options.body){
    options.body = JSON.stringify(options.body);
  }
  options.credentials = 'include';

  const response = await fetch(url, options);

  const data = await getResponseData(response);

  const ret = {
    ...data,
    headers: response.headers
  };

  return ret;
}
