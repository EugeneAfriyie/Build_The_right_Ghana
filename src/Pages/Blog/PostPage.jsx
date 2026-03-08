import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Socials from '../../Components/Socials';
import Reveal from '../../Components/Reveal';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { BlogCard } from '../../Components/Blog';

const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const q = query(collection(db, "posts"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const postData = querySnapshot.docs[0].data();
          setPost(postData);

          // Fetch related posts (latest 3 excluding current)
          const qRelated = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(4));
          const relatedSnapshot = await getDocs(qRelated);
          const related = relatedSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(p => p.slug !== slug)
            .slice(0, 3);
          setRelatedPosts(related);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div className="pt-40 pb-20 text-center text-2xl text-gray-600">Loading...</div>;

  if (!post) {
    return <div className="pt-40 pb-20 text-center text-2xl text-gray-600">Post not found</div>;
  }

  return (
    <article className="pt-32 pb-20 px-6">
      <Reveal>
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="text-[#448c6c] font-bold mb-8 inline-block hover:underline">
          ← Back to News
        </Link>
        
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-[400px] object-cover rounded-2xl mb-10 shadow-lg" 
        />
        
        <span className="text-gray-500 font-medium">{post.date}</span>
        <h1 className="text-4xl md:text-6xl font-bold text-[#2d4e41] mt-4 mb-8 leading-tight">
          {post.title}
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p>{post.content}</p>
          {/* Add more paragraphs/sections here */}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 border-t border-gray-200 pt-16">
            <h3 className="text-3xl font-bold text-[#2d4e41] mb-10">Related Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} {...relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
      </Reveal>

      <Socials />
    </article>
  );
};

export default PostPage;