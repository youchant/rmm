import request from './request';

function parseKey(key) {
  let method = 'get';
  let path = key;

  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ');
    method = splited[0].toLowerCase();
    path = splited[1];
  }

  return {method, path};
}

function queryParams(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

export default function (config) {
  var ret = {};
  Object.entries(config).forEach(([key, value]) => {
    let {method, path} = parseKey(value);
    ret[key] = async function (data) {
      let options = {method: method};
      let url = path;

      // handle url
      let params = url.match(/:(\w+)/g);
      params != null && params.forEach(param => {
        const name = param.substr(1);
        url = url.replace(param, data[name]);
        delete data[name];
      });


      if (method === 'get') {
        if (data) {
          url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(data);
        }
      } else {
        options.body = data;
      }

      return request(url, options);
    }
  });

  return ret;
}
