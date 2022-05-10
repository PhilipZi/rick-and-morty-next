import { promises } from "fs";

export default async function addToDatabase(req, res) {
  if (req.method === "POST") {
    const data = await promises.readFile("database.json", "utf-8");
    const users = JSON.parse(data);
    const newUser = req.body;

    users.push(newUser);
    //console.log(users);
    promises.writeFile("database.json", JSON.stringify(users, null, 4));
    res.status(201).json(newUser);
    return;
  }
  res.status(403).json({ message: "Error: request method not allowed." });
}
