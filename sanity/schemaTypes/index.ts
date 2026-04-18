import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { Post } from './PostType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, Post],
}
