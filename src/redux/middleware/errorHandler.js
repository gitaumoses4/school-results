export default (error) => {
  return error.response && error.response.data && error.response.data.message;
};
