import { createDatabase, createLocalDatabase } from '@tinacms/datalayer'
import { GitHubProvider } from 'tinacms-gitprovider-github'
import { MongodbLevel } from 'mongodb-level'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

const branch =
    process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main'

if (!branch) {
    throw new Error(
        'No branch found. Make sure that you have set the GITHUB_BRANCH or process.env.VERCEL_GIT_COMMIT_REF environment variable.'
    )
}

export default isLocal
    ? createLocalDatabase()
    : createDatabase({
        gitProvider: new GitHubProvider({
            branch: process.env.GITHUB_BRANCH,
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        }),
        
        databaseAdapter: new MongodbLevel<string, Record<string, any>>({
            collectionName: `tinacms-${branch}`,
            dbName: 'tinacms',
            mongoUri: process.env.MONGODB_URI as string,
        }),
        debug: process.env.DEBUG === 'true' || false,
        namespace: branch,
        // No need for onPut / onDelete anymore here unless using Git
    })
