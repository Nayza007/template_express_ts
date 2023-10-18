import { Request, Response } from "express";

const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json({ message: "resource not found on this server" });
};

export default notFoundMiddleware;
