import { Router } from "express";
import { upload, uploadTxt } from "../app.factory";

import { simple, multiple, download } from "../controllers/upload.controller";
import multer from "multer";

const s = upload.single("file");

const router = Router();

router.post(
  "/simple",
  // upload.single("file"),
  function (req, res, next) {
    s(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(400).json("A Multer error occurred when uploading.");
      } else if (err) {
        // An unknown error occurred when uploading.
        return res
          .status(400)
          .json("An unknown error occurred when uploading.");
      }

      // Everything went fine.
      next();
    });
  },
  simple
);

router.post("/multiple", upload.array("files", 5), multiple);

router.post("/txt_multiple", uploadTxt.array("files", 5), multiple);

router.get("/download", download);

export default router;
