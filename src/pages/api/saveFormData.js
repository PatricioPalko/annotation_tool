import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export default function handler(req, res) {
  if (req.method === "POST") {
    const formData = req.body;

    // Generate a unique filename for each file
    const timestamp = Date.now();
    const uuid = uuidv4();
    const uniqueFilename = `${timestamp}_${uuid}`;

    // Serialize data to JSON
    const jsonData = JSON.stringify(formData);

    // Path to the JSON file
    const filePath = path.join(
      process.cwd(),
      "public",
      `${formData.supplierName}_${uniqueFilename}.json`
    );

    try {
      // Write JSON data to a file
      fs.writeFileSync(filePath, jsonData);

      res.status(200).json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Failed to save form data" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
