import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogCard } from '../../Components/Blog';
import Socials from '../../Components/Socials';
import Reveal from '../../Components/Reveal';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { Search, ChevronRight, Mail } from 'lucide-react';

const BlogArchive = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(fetchedPosts.map(post => post.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = allPosts;

    if (selectedCategory !== 'All') {
      result = result.filter(post => post.category === selectedCategory);
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(lowerQuery) || 
        post.excerpt.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredPosts(result);
  }, [searchQuery, selectedCategory, allPosts]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#2d4e41] text-xl font-bold">Loading stories...</div>;

  // Only show featured layout for the very first post when no filters are active
  const showFeatured = selectedCategory === 'All' && !searchQuery && filteredPosts.length > 0;
  const latestPost = showFeatured ? filteredPosts[0] : null;
  const gridPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts;

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#2d4e41] text-white pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
                <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="2" className="text-white" fill="currentColor" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
            </svg>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <Reveal>
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-sm font-bold tracking-wider uppercase mb-6 border border-white/20">
              Our Blog
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Stories of Impact</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Follow our journey as we work towards building a better future for Ghana.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-6 items-center justify-between">
           {/* Categories */}
           <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
               {categories.map(cat => (
                   <button
                       key={cat}
                       onClick={() => setSelectedCategory(cat)}
                       className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                           selectedCategory === cat 
                           ? 'bg-[#2d4e41] text-white shadow-md transform scale-105' 
                           : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#2d4e41]'
                       }`}
                   >
                       {cat}
                   </button>
               ))}
           </div>

           {/* Search */}
           <div className="relative w-full md:w-80 group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#448c6c] transition-colors" size={20} />
               <input 
                   type="text" 
                   placeholder="Search articles..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#448c6c]/50 focus:bg-white transition-all"
               />
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {latestPost && (
          <Reveal>
            <div className="mb-24 group">
                <Link to={`/blog/${latestPost.slug}`} className="block">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
                        <div className="lg:col-span-7 h-[350px] md:h-[500px] rounded-[1.5rem] overflow-hidden relative">
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
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d4e41] mb-6 leading-[1.1] group-hover:text-[#448c6c] transition-colors">
                                {latestPost.title}
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 line-clamp-3 leading-relaxed">
                                {latestPost.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-[#2d4e41] font-bold uppercase tracking-wider group-hover:gap-4 transition-all">
                                Read Full Story <ChevronRight size={20} className="text-[#448c6c]" />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
          </Reveal>
        )}

        {gridPosts.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {gridPosts.map((post) => (
                  <Reveal key={post.id}>
                      <BlogCard {...post} />
                  </Reveal>
              ))}
           </div>
        ) : (
            <div className="text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <Search size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No stories found</h3>
                <p className="text-gray-500 max-w-md mx-auto">We couldn't find any articles matching your search. Try adjusting your keywords or category.</p>
                <button 
                    onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                    className="mt-6 text-[#448c6c] font-bold hover:underline"
                >
                    Clear all filters
                </button>
            </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#e6f0eb] py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#448c6c]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#2d4e41]/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="w-20 h-20 bg-white text-[#2d4e41] rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-6 shadow-xl">
                  <Mail size={40} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2d4e41] mb-6">Stay in the loop</h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                  Join our community newsletter to receive the latest updates, impact stories, and opportunities to get involved.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                  <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="flex-1 px-8 py-4 rounded-full border-2 border-transparent focus:border-[#448c6c] focus:ring-4 focus:ring-[#448c6c]/10 outline-none shadow-sm text-lg"
                  />
                  <button className="bg-[#2d4e41] text-white px-10 py-4 rounded-full font-bold hover:bg-[#1f362d] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                      Subscribe
                  </button>
              </form>
              <p className="text-sm text-gray-500 mt-6">We care about your data in our <span className="underline cursor-pointer">privacy policy</span>.</p>
          </div>
      </div>

      <Socials />
    </main>
  );
};

export default BlogArchive;