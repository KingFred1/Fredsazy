import { defineQuery } from "next-sanity";


export const STARTUPS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current) && (!defined($category) || category == $category) && (!defined($search) || title match $search || category match $search || author->name match $search)] | order(_createdAt desc) {
        _id,
        title,
        slug,
        _createdAt,
        author -> {
          _id, name, image, bio, username
        },
        views,
        description,
        category,
        mainImage
      }`)

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "post" && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  },
  views,
  description,
  category,
  mainImage,
  pitch,
}`)

export const STARTUP_BY_SLUG_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  },
  views,
  description,
  category,
  mainImage,
  pitch,
}`)

export const STARTUPS_BY_CATEGORY_QUERY =
  defineQuery(`*[_type == "post" && category == $category && _id != $id && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio, username
    },
    views,
    description,
    category,
    mainImage
  }[0...3]`)

export const STARTUP_VIEWS_QUERY = defineQuery(`
  *[_type == "post" && _id == $id][0]{
      _id, views
  }
`)

export const STARTUP_CATEGORIES_QUERY = defineQuery(`*[_type == "post" && defined(category)]{category}`)

export const AUTHORS_QUERY = defineQuery(`*[_type == "author"] | order(name asc){_id, name, username, bio, image}`)

export const AUTHOR_BY_ID_QUERY = defineQuery(`*[_type == "author" && _id == $id][0]{_id, name, username, bio, image}`)

export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(`*[_type == "post" && author._ref == $id] | order(_createdAt desc) {
        _id,
        title,
        _createdAt,
        author -> {
          _id, name, image, bio, username
        },
        views,
        description,
        category,
        mainImage
      }`)
