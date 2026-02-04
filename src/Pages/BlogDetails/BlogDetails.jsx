import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import './BlogDetails.css'
import { blogsData } from '../../data/blogsData'
import BlogCard from '../../Components/BlogCard/BlogCard'
import { ChevronRight } from 'lucide-react'
import { getArticleByHandle, getJournals } from '../../services/blogService'

const BlogDetails = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlogData()
    fetchRelatedBlogs()
  }, [id])

  const fetchBlogData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getArticleByHandle(id)
      console.log('Article response:', response)
      if (response.success && response.data) {
        setBlog(response.data)
      } else {
        setError('Blog not found')
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error)
      setError('Failed to load blog')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRelatedBlogs = async () => {
    try {
      const response = await getJournals()
      if (response.success && response.data?.articles?.edges) {
        // Get 3 related blogs excluding current one
        const filtered = response.data.articles.edges
          .filter(edge => edge.node.handle !== id)
          .slice(0, 3)
          .map(edge => edge.node)
        setRelatedBlogs(filtered)
      }
    } catch (error) {
      console.error('Failed to fetch related blogs:', error)
    }
  }
  
  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="blog-details-skeleton">
          <div className="skeleton-breadcrumbs">
            <div className="skeleton-breadcrumb-item"></div>
            <div className="skeleton-breadcrumb-item"></div>
            <div className="skeleton-breadcrumb-item"></div>
          </div>
          
          <div className="blog-details-main-container">
            <div className="skeleton-image"></div>
            
            <div className="blog-description">
              <div className="skeleton-category"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-paragraph"></div>
              <div className="skeleton-paragraph"></div>
              <div className="skeleton-paragraph short"></div>
            </div>
            
            <div className="blog-author-container">
              <div className="skeleton-author-label"></div>
              <div className="skeleton-author-name"></div>
            </div>
          </div>
          
          <div className="related-blogs-container">
            <div className="skeleton-blog-card"></div>
            <div className="skeleton-blog-card"></div>
            <div className="skeleton-blog-card"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="blog-details-not-found">
        <h2>Blog not found</h2>
        <NavLink to="/blogs">Back to Blogs</NavLink>
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <div className="breadcrumbs-section">
        <NavLink to="/">Home</NavLink>
        <ChevronRight />
        <NavLink to="/blogs">Journals</NavLink>
        <ChevronRight />
        <span>Details</span>
      </div>

      {/* <h1 className="blog-details-heading">{blog.title}</h1> */}

      <div className="blog-details-main-container">
        <img 
          src={blog.image?.url || blog.image} 
          alt={blog.title} 
          className='blog-details-image' 
        />

        <div className="blog-description">
          <span className="blog-details-category">{blog.category || 'Journal'}</span>
          <h1>{blog.title}</h1>
          {blog.contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: blog.contentHtml }} />
          ) : blog.excerpt ? (
            <p>{blog.excerpt}</p>
          ) : null}
        </div>

        <div className="blog-author-container">
          <p>Written by:</p>
          <h1>{blog.author?.name || blog.author || 'Mommy First'}</h1>
        </div>
      </div>

      <div className="related-blogs-container">
        {relatedBlogs.map((relatedBlog) => (
          <BlogCard key={relatedBlog.id} blog={relatedBlog} />
        ))}
      </div>
    </div>
  )
}

export default BlogDetails