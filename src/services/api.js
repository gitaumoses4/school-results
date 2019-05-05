import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const call = (method, endpoint, data, mock, mockStatus = 200) => new Promise ((resolve, reject) => {
  setTimeout(() => {
    axios[method](`${baseUrl}${endpoint}`, data).then((response) => {
      resolve(response);
    }).catch((error) => {
      if( process.env.NODE_ENV === 'development' && mock){
        const response = {
          status: mockStatus,
          data: mock
        };
        if( mockStatus < 399){
          resolve(response);
        }else {
          error.status = mockStatus;
          error.response = {
            data: mock
          };
          reject(error);
        }
      }else{
        reject(error);
      }
    });
  }, process.env.NODE_ENV === 'development' ? 2000 : 0);
});

export default class Api {

  static get(endpoint, mock, status){
    return call('get', endpoint, null, mock, status);
  }
  static post(endpoint,data, mock, status){
    return call('post', endpoint,data, mock, status);
  }
  static put(endpoint, data, mock, status){
    return call('put', endpoint,data, mock, status);
  }
  static delete(endpoint, data, mock, status){
    return call('delete', endpoint, mock, status);
  }
}
