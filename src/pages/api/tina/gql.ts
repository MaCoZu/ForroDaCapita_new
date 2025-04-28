import { isUserAuthorized } from "@tinacms/auth";

import { databaseRequest } from '../../lib/databaseConnection'
import database from '../../tina/database'

export default async function handler(req, res) {
    const isAuthorized = await isUserAuthorized({
            token: req.headers.authorization,
          clientID: "<YourClientIdFromTinaCloud>",
    });
    
if (!isAuthorized) {
      return res.status(401).json({ message: "Unauthorized" });
}
    
    const { query, variables } = req.body
    const result = await databaseRequest({ query, variables, database })
    return res.json(result)
}