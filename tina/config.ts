import { defineConfig } from 'tinacms';
import { LocalAuthProvider } from '@tinacms/datalayer'; // <= LOCAL AUTH from Datalayer
import { AuthJSAuthProvider } from 'tinacms-authjs';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default defineConfig({
  // branch: process.env.GITHUB_BRANCH || 'main',
  // token: process.env.TINA_TOKEN,
  // clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,

  authProvider: isLocal
    ? new LocalAuthProvider()
    : new AuthJSAuthProvider(), 

  contentApiUrlOverride: '/api/tina/gql',

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "news",
        label: "News",
        path: "src/content/news",
        fields: [
          { name: "title", label: "Title", type: "string", isTitle: true, required: true },
          { name: "pubDate", label: "Publication Date", type: "datetime" },
          { name: "updatedDate", label: "Update Date", type: "datetime" },
          { name: "thumbnail", label: "Image", type: "image" },
          { name: "body", label: "Body", type: "rich-text", isBody: true },
        ],
      },
    ],
  },
});
