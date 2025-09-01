import { defineDocumentType, makeSource } from "contentlayer/source-files"

const computedFields = {
  slug: {
    type: "string" as const,
    resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string" as const,
    resolve: (doc: any) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: true,
    },
    authors: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post],
})