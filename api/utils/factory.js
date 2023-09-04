import expressAsyncHandler from "express-async-handler";
import AppError from "./errorFactory.js";
import { applyOptions } from "./queryOptions.js";

const createOne = (Model) => {
  return expressAsyncHandler(async (req, res) => {
    const document = await Model.create(req.body);

    res.status(201).json(document);
  });
};

const getOne = (Model, pop, popOptions = {}) => {
  return expressAsyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    for (let field of pop) {
      query = query.populate(field, popOptions);
    }
    const document = await query;
    if (!document) {
      return next(new AppError(400, "No document found with that ID"));
    }

    res.status(200).json(document);
  });
};

const getAll = (Model) => {
  return expressAsyncHandler(async (req, res) => {
    const query = applyOptions(Model.find(), req);
    const documents = await query;
    res.status(200).json({ results: documents.length, data: documents });
  });
};

const updateOne = (Model) => {
  return expressAsyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!document) {
      return next(new AppError(400, "No document found with that ID"));
    }

    res.status(200).json(document);
  });
};

const deleteOne = (Model) => {
  return expressAsyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new AppError(400, "No document found with that ID"));
    }

    res.status(200).json(null);
  });
};

export { createOne, getOne, getAll, updateOne, deleteOne };
