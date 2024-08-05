import { Request, Response, NextFunction } from "express";

const errorHanlder = (err: any, req: Request, res: Response, nest: NextFunction): void => {
    console.error(err.stack);
    res.status(500).json({message: "Internal server error"});
};

export default errorHanlder;