export default {
  home: '/',


  posts(post: { name: string }) {
    return {
      href: '/posts/[slug]',
      as: `/posts/${post.name}`
    }
  }
}