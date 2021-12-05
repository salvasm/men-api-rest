import { Response } from "express";
import { error } from "../interfaces/global";

const mongoErrors = {
	duplicatedKeyError:  (error: error, res: Response) => {
	  const field = Object.keys(error.keyValue);
	  const status = 409;
	  const message = 'An item with that "' + field + '" already exists';
	
	  res.status(status).send({
		success: false,
		status: status,
		message: message,
		fields: field,
		error: error,
	  });
	},
	handleValidationError: (error: error, res: Response) => {
	  const errors = Object.values(error.errors).map((el:any) => el.message);
	  const fields = Object.values(error.errors).map((el:any) => el.path);
	  const status = 400;
	  if (errors.length > 1) {
		const formattedErrors = errors.join("");
		res.status(status).send({
            success: false,
            status: status,
            message: formattedErrors,
            fields: fields,
		});
	  } else {
		res.status(status).send({
            success: false,
            status: status,
            message: errors,
            fields: fields,
		});
	  }
	}
}

export default mongoErrors;