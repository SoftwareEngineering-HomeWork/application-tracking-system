import axios from 'axios'

export default function fetch (options) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://127.0.0.1:5001' + options.url,
      method: options.method,
      headers: options.headers,
      params: options.params,
      data: options.body
    }).then((response) => {
      resolve(response.data)
    }).catch((e) => {
      if (e.status === 401) {
        window.location.href = "/";
        localStorage.removeItem('token')
      }
      reject(e)
    })
  })
}

export const getrecruiterToken = (params) => {
  // console.log(params)
  return fetch({
    method: "POST",
    url: "/recruiter/login",
    body: params,
  });
};

export const recruitersignUp = (params) => {
  return fetch({
    method: "POST",
    url: "/recruiter/signup",
    body: params,
  });
};

export const storeToken = (obj) => {
  localStorage.setItem("token", obj.token);
  localStorage.setItem("userId", obj.userId);
};