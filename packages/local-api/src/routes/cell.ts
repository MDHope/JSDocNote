import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (request, response) => {
    try {
      //* Read the file
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      response.send(JSON.parse(result));
    } catch (error) {
      //* If read throws an error
      //* inspect the error, see if it says the file doesnt exist
      if (error.code === "ENOENT") {
        //* Add code to create a file and add default cells
        await fs.writeFile(fullPath, "[]", "utf-8");
        response.send([]);
      } else {
        //* Something wrong
        throw error;
      }
    }

    //* Read the file, parse a list of cells
    //* Send list of cells back to browser
  });

  router.post("/cells", async (request, response) => {
    //* take the list of cells from request object
    //* serialize them
    const { cells }: { cells: Array<Cell> } = request.body;

    //* write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    response.send({ status: "ok" });
  });

  return router;
};
