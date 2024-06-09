function PARSE_DB_RESPONSE(response, key) {
  return response[0][0][key] ?? null
}

module.exports = {
    PARSE_DB_RESPONSE,
};