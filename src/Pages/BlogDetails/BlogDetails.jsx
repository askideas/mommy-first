import React from 'react'
import { useParams, NavLink } from 'react-router-dom'
import './BlogDetails.css'
import { blogsData } from '../../data/blogsData'
import BlogCard from '../../Components/BlogCard/BlogCard'
import { ChevronRight } from 'lucide-react'

const BlogDetails = () => {
  const { id } = useParams()
  const blog = blogsData.find(b => b.id === parseInt(id))
  
  // Get related blogs (exclude current blog, limit to 3)
  const relatedBlogs = blogsData
    .filter(b => b.id !== parseInt(id))
    .slice(0, 3)

  if (!blog) {
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
        <NavLink to="/care-hub">Journals</NavLink>
        <ChevronRight />
        <NavLink to="/blogs">Journals</NavLink>
        <ChevronRight />
        <span>Details</span>
      </div>

      {/* <h1 className="blog-details-heading">{blog.title}</h1> */}

      <div className="blog-details-main-container">
        <img 
          src={blog.heroImage || blog.image} 
          alt={blog.title} 
          className='blog-details-image' 
        />

        <div className="blog-description">
          <span className="blog-details-category">{blog.category}</span>
          <h1>{blog.title}</h1>
          {blog.content && blog.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="blog-author-container">
          <p>Written by:</p>
          <h1>{blog.author}</h1>
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