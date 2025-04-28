// pages/api/tina/[...routes].{ts,js}

import { TinaNodeBackend, LocalBackendAuthentication } from '@tinacms/datalayer'
import { TinaAuthJSOptions, AuthJsBackendAuthentication } from 'tinacms-authjs'
import databaseClient from '../../../../tina/__generated__/databaseClient'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const handler = TinaNodeBackend({
    databaseClient,
    authentication: isLocal
        ? LocalBackendAuthentication()
        : AuthJsBackendAuthentication({
            authOptions: TinaAuthJSOptions({
                databaseClient: databaseClient,
                secret: process.env.NEXTAUTH_SECRET,
            }),
        }),
});

export default (req, res) => {
    // Modify the request here if you need to
    return handler(req, res)
}