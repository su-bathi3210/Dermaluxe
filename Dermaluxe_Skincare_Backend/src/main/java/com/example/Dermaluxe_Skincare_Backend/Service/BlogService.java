package com.example.Dermaluxe_Skincare_Backend.Service;

import com.example.Dermaluxe_Skincare_Backend.Model.Blog;
import com.example.Dermaluxe_Skincare_Backend.Repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    // Get all blogs
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // Get blog by ID
    public Optional<Blog> getBlogById(String id) {
        return blogRepository.findById(id);
    }

    // Add a new blog
    public Blog addBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    // Update an existing blog
    public Blog updateBlog(String id, Blog updatedBlog) {
        Optional<Blog> existingBlog = blogRepository.findById(id);
        if (existingBlog.isPresent()) {
            Blog blog = existingBlog.get();
            blog.setTitle(updatedBlog.getTitle());
            blog.setCategory(updatedBlog.getCategory());
            blog.setDescription(updatedBlog.getDescription());
            blog.setDate(updatedBlog.getDate());
            blog.setContent(updatedBlog.getContent());
            blog.setImage(updatedBlog.getImage());
            blog.setAuthor(updatedBlog.getAuthor());
            return blogRepository.save(blog);
        } else {
            throw new RuntimeException("Blog not found with ID: " + id);
        }
    }

    // Delete a blog by ID
    public void deleteBlog(String id) {
        blogRepository.deleteById(id);
    }
}
