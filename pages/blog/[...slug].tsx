import fs from 'fs'
import { MDXLayoutRenderer, PageTitle } from '~/components'
import { POSTS_PER_PAGE } from '~/constant'
import { formatSlug, generateRss, getCommentConfigs, getFiles } from '~/libs'
import { getAllFilesFrontMatter, getFileBySlug } from '~/libs/mdx'
import type { BlogProps, MdxPageLayout } from '~/types'

let DEFAULT_LAYOUT: MdxPageLayout = 'PostSimple'

export async function getStaticPaths() {
  let posts = getFiles('blog')
  return {
    paths: posts.map((p: string) => ({
      params: {
        slugs: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { slugs: string[] } }) {
  let allPosts = getAllFilesFrontMatter('blog')
  let postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slugs.join('/'))
  let prev = allPosts[postIndex + 1] || null
  let next = allPosts[postIndex - 1] || null
  let page = Math.ceil((postIndex + 1) / POSTS_PER_PAGE)
  let post = await getFileBySlug('blog', params.slugs.join('/'))

  let authors = post.frontMatter.authors || ['default']
  let authorDetails = await Promise.all(
    authors.map(async (author) => {
      let authorData = await getFileBySlug('authors', author)
      return authorData.frontMatter
    })
  )

  // rss
  let rss = generateRss(allPosts)
  fs.writeFileSync('./public/feed.xml', rss)
  let commentConfig = getCommentConfigs()

  return { props: { post, authorDetails, prev, next, page, commentConfig } }
}

export default function Blog(props: BlogProps) {
  let { post, authorDetails, prev, next, page, commentConfig } = props
  let { mdxSource, frontMatter } = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          type="blog"
          prev={prev}
          next={next}
          page={page}
          commentConfig={commentConfig}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under letruction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
