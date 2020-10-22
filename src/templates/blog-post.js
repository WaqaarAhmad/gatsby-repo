import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogBost(slug: { eq: $slug }) {
        blogTitle
      publishedDate(formatString: "Do MMMM, YYYY")
      featureImage {
        fluid(maxWidth: 750) {
          ...GatsbyContentfulFluid
        }
      }
      body {
        json
      }
    }
  }
`

const BlogPost = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      },
    },
  }
  return (
    <Layout>
      <SEO title={props.data.contentfulBlogBost.blogTitle} />
      <Link to="/blog/">Blog Page</Link>
      <div className="content">
        <h1>{props.data.contentfulBlogBost.blogTitle}</h1>
        <span className="meta">
          Posted on {props.data.contentfulBlogBost.publishedDate}
        </span>

        {props.data.contentfulBlogBost.featureImage && (
          <Img
            className="featured"
            fluid={props.data.contentfulBlogBost.featureImage.fluid}
            alt={props.data.contentfulBlogBost.blogTitle}
          />
        )}
      {documentToReactComponents(props.data.contentfulBlogBost.body.json, options)}
      </div>
    </Layout>
  )
}

export default BlogPost
