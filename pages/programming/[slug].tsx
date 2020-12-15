import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import glob from 'glob'

export default function BlogTemplate(props) {
  // Render data from `getStaticProps`
  return (
    
      <article>
        <h1>{props.frontmatter.title}</h1>
        
          <ReactMarkdown source={props.markdownBody} />
        
      </article>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params
  const content = await import(`../../content/programming/${slug}.md`)
  const data = matter(content.default)

  return {
    props: {
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  //get all .md files in the posts dir
  const blogs = glob.sync('content/programming/*.md')

  console.log(blogs);
  

  //remove path and extension to leave filename only
  const blogSlugs = blogs.map(file =>
    file
      .split('/')[2]
      .replace(/ /g, '-')
      .slice(0, -3)
      .trim()
  )

  // create paths with `slug` param
  const paths = blogSlugs.map(slug => `/programming/${slug}`)


  console.log(paths);
  
  

  return {
    paths,
    fallback: false,
  }
}