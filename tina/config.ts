import { defineConfig } from 'tinacms';
import { LocalAuthProvider } from 'tinacms' 
import {
  TinaUserCollection,
  UsernamePasswordAuthJSProvider,
} from 'tinacms-authjs/dist/tinacms'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || 'main',
  token: process.env.TINA_TOKEN,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,

  // IMPORTANT: Add this line to fix the API URL issue
  // apiURL: "/api/tina/gql",
  apiURL: "http://localhost:4321/api/tina/gql",

  // For backward compatibility with older TinaCMS versions
  contentApiUrlOverride: "/api/tina/gql",
  
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  // Change this from "mongodb" to "local" for testing
 

  // Configure the MongoDB adapter for self-hosting
  database: {
    adapter: "mongodb",
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/tina-astro",
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      TinaUserCollection,
      {
        name: "news",
        label: "News",
        path: "src/content/news",
        fields: [
          { name: "title", label: "Title", type: "string", isTitle: true, required: true },
          { name: "pubDate", label: "Publication Date", type: "datetime" },
          { name: "updatedDate", label: "Update Date", type: "datetime" },
          { name: "thumbnail", label: "Image", type: "image", required: false },
          { name: "body", label: "Body", type: "rich-text", isBody: true },
        ],
      },
      {
        name: "pages",
        label: "Pages",
        path: "src/content/pages",
        fields: [
          { name: "title", label: "Title", type: "string", isTitle: true, required: true, },
          { name: "body", label: "Page Content", type: "rich-text", isBody: true, },
        ],
      }
    ],
  },
});
