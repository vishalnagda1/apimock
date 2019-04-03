export let hello = (request, h) => {
  let { name } = request.query;
  return `Hello, ${name || 'world'}`;
};

