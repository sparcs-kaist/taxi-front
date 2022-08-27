const getS3Url = (x) => {
  return `${process.env.REACT_APP_S3_URL}${x}`;
};

export { getS3Url };
