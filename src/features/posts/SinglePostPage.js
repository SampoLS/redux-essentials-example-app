import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from '../users/PostAuthor'
import { TimeAgo } from '../users/TimeAgo'
import { selectPostById } from './postsSlice'
import { ReactionButtons } from './ReactionButtons'

export const SinglePostPage = ({ match }) => {
  const { id } = match.params

  const post = useSelector((state) => selectPostById(state, id))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article>
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
