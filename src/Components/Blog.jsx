import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Socials from './Socials';
import Reveal from './Reveal';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { ChevronRight } from 'lucide-react';

  export const BlogCard = ({ date, category, title, excerpt, imageUrl, slug }) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      {/* Image Container */}
      <div className="h-52 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-4 left-4 bg-[#448c6c] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-sm text-gray-500 font-medium mb-2">{date}</span>
        {/* Title also links to the post */}
        <Link to={`/blog/${slug}`}>
          <h4 className="text-[#2d4e41] text-xl font-bold mb-3 line-clamp-2 hover:text-[#448c6c] cursor-pointer">
            {title}
          </h4>
        </Link>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="mt-auto">
          {/* Link to specific article */}
          <Link 
            to={`/blog/${slug}`} 
            className="text-[#448c6c] font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all"
          >
            Read Full Story <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const latestPost = posts[0];
  const otherPosts = posts.slice(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(3));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Reveal>
    <section className="py-20 px-6 md:px-20 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h3 className="text-[#448c6c] font-bold uppercase tracking-widest mb-4">
              LATEST NEWS
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d4e41]">
              Insights from our <br /> journey in Ghana
            </h2>
          </div>
          {/* Navigate to the full blog archive */}
          <button 
            onClick={() => navigate('/blog')}
            className="border-2 border-[#448c6c] text-[#448c6c] font-bold px-8 py-3 rounded-full hover:bg-[#448c6c] hover:text-white transition-all uppercase tracking-wide"
          >
            View All Posts
          </button>
        </div>

        {latestPost && (
          <div className="mb-12 group">
              <Link to={`/blog/${latestPost.slug}`} className="block">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
                      <div className="lg:col-span-7 h-[300px] md:h-[400px] rounded-[1.5rem] overflow-hidden relative">
                          <img 
                              src={latestPost.imageUrl} 
                              alt={latestPost.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md text-[#2d4e41] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                              Featured • {latestPost.category}
                          </div>
                      </div>
                      <div className="lg:col-span-5 p-4 md:p-8 lg:pr-12 flex flex-col justify-center">
                          <div className="flex items-center gap-3 text-gray-500 text-sm font-medium mb-6">
                              <span className="bg-gray-100 px-3 py-1 rounded-full">{latestPost.date}</span>
                          </div>
                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2d4e41] mb-4 leading-[1.1] group-hover:text-[#448c6c] transition-colors">
                              {latestPost.title}
                          </h2>
                          <p className="text-gray-600 text-base mb-6 line-clamp-3 leading-relaxed">
                              {latestPost.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-[#2d4e41] font-bold uppercase tracking-wider group-hover:gap-4 transition-all text-sm">
                              Read Full Story <ChevronRight size={18} className="text-[#448c6c]" />
                          </div>
                      </div>
                  </div>
              </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post, index) => (
            <BlogCard key={post.id || index} {...post} />
          ))}
        </div>
      </div>

      <Socials />
    </section>
    </Reveal>
  );
};

export default Blog;