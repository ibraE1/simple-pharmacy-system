const createOne = (Model) => {
  return async (req, res) => {
    const document = await Model.create(req.body);

    res.status(200).json(document);
  };
};

const getOne = (Model) => {
  return async (req, res) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return res.status(400).json("No document found with that ID");
    }

    res.status(200).json(document);
  };
};

const getAll = (Model) => {
  return async (req, res) => {
    const documents = await Model.find();

    res.status(200).json({ results: documents.length, data: documents });
  };
};

const updateOne = (Model) => {
  return async (req, res) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return res.status(400).json("No document found with that ID");
    }

    res.status(200).json(document);
  };
};

const deleteOne = (Model) => {
  return async (req, res) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(400).json("No document found with that ID");
    }

    res.status(200).json(null);
  };
};

export { createOne, getOne, getAll, updateOne, deleteOne };