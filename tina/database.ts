import { createDatabase, createLocalDatabase } from '@tinacms/datalayer'
import { MongodbLevel } from 'mongodb-level'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'
const branch = process.env.GITHUB_BRANCH || 'main'

export default isLocal
    ? createLocalDatabase()
    : createDatabase({
        databaseAdapter: new MongodbLevel({
            collectionName: `tinacms-${branch}`,
            dbName: 'tinacms',
            mongoUri: process.env.MONGODB_URI as string,
        }),
        // No need for onPut / onDelete anymore here unless using Git
    })
