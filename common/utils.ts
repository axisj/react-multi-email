const JSONValidator = (rule: any, value: any, callback: any) => {
  try {
    JSON.parse(value);
    callback();
  } catch (err) {
    callback('It is not JSON format');
  }
};

export { JSONValidator };
