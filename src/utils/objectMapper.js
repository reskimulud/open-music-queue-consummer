const objectMapper = (input) => {
  delete input.username;
  return JSON.stringify({
    playlist: input,
  });
};

module.exports = objectMapper;
