import React from "react";
import { FaRegCommentDots } from "react-icons/fa6";
import { MdPersonOutline } from "react-icons/md";
import { ImArrowUpRight2 } from "react-icons/im";
import "./index.css";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <div className="blog-date">{blog.date}</div>
      <div className="blog-content">
        <div className="blog-content-top-sec">
        <div className="blog-content-top-sec-each">
            <MdPersonOutline style={{color:'#4caf50'}} />
            <p className="blog-para">wpboss</p>
        </div>
        <div className="blog-content-top-sec-each">
            <FaRegCommentDots style={{color:'#4caf50'}}/>
            <p className="blog-para">Comment (0)</p>
        </div>
        </div>
        <h3 className="blog-title">{blog.title}</h3>
      

      <button className="read-more-btn">
      <a href="/" className="read-more-text">
          READ MORE 
        </a>
      </button>
       
        

       
        
      </div>
    </div>
  );
};

export default BlogCard;
