import * as classService from './class.service.js'

export const createClass = async (req, res, next) => {
  try {
    const data = await classService.createClass(
      req.body,
      req.userId
    )
    res.status(201).json(data);
  } catch (error) {
    next(error)
  }
}

export const getAllClasses = async (req, res, next) => {
  try {
    const data = await classService.getAllClasses(
      req.query,
      req.userId
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getClassDropdown = async (req, res, next) => {
  try {
    const data = await classService.getClassDropdown(req.userId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getClassById = async (req, res, next) => {
  try {
    const data = await classService.getClassById(
      req.params.id,
      req.userId
    );

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
