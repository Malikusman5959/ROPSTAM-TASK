// this function validates the body of a request against the given schema 

exports.validateBody = (schema) => async (req, res, next) => {
    try {
      await schema.validate({
        ...req.body
      });
      return next();
    } catch (err) {
      return res.status(500).json({ type: err.name, message: err.message });
    }
  };