// const filter = (query) => {
//     const { sort, page, limit, fields, ...filters } = req.query;
//     query.find()
// };

let req;

const sort = (query) => {
  if (req.query.sort) {
    query = query.sort(req.query.sort.split(",").join(" "));
  } else {
    query = query.sort("-createdAt");
  }

  return query;
};

const selectFields = (query) => {
  if (req.query.fields)
    query = query.select(req.query.fields.split(",").join(" "));

  return query;
};

const filter = (query) => {
  const { sort, fields, page, limit, ...filter } = req.query;
  return query.find(filter);
};

const paginate = (query) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  return query.skip(skip).limit(limit);
};

function applyOptions(query, request) {
  req = request;
  return paginate(selectFields(filter(sort(query))));
}

export { applyOptions };
