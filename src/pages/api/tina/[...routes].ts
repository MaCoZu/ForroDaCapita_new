import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer'
import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from 'tinacms-authjs'
import databaseClient from '../../../../tina/__generated__/databaseClient'

import type { NextApiRequest, NextApiResponse } from 'next'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const handler = TinaNodeBackend({
    authProvider: isLocal
        ? LocalBackendAuthProvider()
        : AuthJsBackendAuthProvider({
            authOptions: TinaAuthJSOptions({
                databaseClient: databaseClient,
                secret: process.env.NEXTAUTH_SECRET!,
            }),
        }),
    databaseClient,
})

export default (req: NextApiRequest, res: NextApiResponse) => {
    return handler(req, res)
}