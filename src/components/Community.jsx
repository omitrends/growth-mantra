import { useState, useEffect } from 'react';
import './Community.css';
import React from "react";

import {
    MessageCircle, ThumbsUp, ThumbsDown, Share, Bookmark,
    Flag, Send, Search, User, Clock, Tag,
    TrendingUp, AlertCircle, X
} from 'lucide-react';

const Community = () => {
    // States
    const [posts, setPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [replyContents, setReplyContents] = useState({});
    const [expandedPost, setExpandedPost] = useState(null);
    const [filter, setFilter] = useState('latest');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categories] = useState(['General', 'Fitness', 'Nutrition', 'Mental Health', 'Lifestyle']);
    const [selectedCategory, setSelectedCategory] = useState('General');
    const [notifications, setNotifications] = useState([]);
    const [currentUser, setCurrentUser] = useState('User'); // Simulate user authentication
    const [newPostTags, setNewPostTags] = useState(''); // For adding tags to new posts

    // Sample posts data
    const samplePosts = [
        {
            id: 1,
            title: "Best supplements for muscle recovery?",
            content: "I've been training intensely 5 days a week and my recovery has been getting worse. What supplements have worked best for you for muscle recovery? I'm currently just taking protein and creatine.",
            author: "FitnessEnthusiast",
            timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
            category: "Fitness",
            replies: [
                {
                    id: 101,
                    content: "I've found that taking magnesium glycinate before bed has dramatically improved my recovery. Also consider adding tart cherry juice to your routine as it has anti-inflammatory properties.",
                    author: "Anonymous",
                    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
                    upvotes: 7,
                    downvotes: 1
                },
                {
                    id: 102,
                    content: "Don't overlook the importance of proper sleep! No supplement can compensate for inadequate rest. That said, ZMA has helped improve my sleep quality.",
                    author: "Anonymous",
                    timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
                    upvotes: 12,
                    downvotes: 0
                }
            ],
            upvotes: 24,
            downvotes: 2,
            saved: false,
            tags: ["recovery", "supplements", "training"]
        },
        {
            id: 2,
            title: "Dealing with anxiety before competitions",
            content: "How do you all deal with pre-competition anxiety? I find myself getting so nervous before events that it affects my performance. Any mental strategies or techniques you've found helpful?",
            author: "CompetitiveAthlete",
            timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
            category: "Mental Health",
            replies: [
                {
                    id: 201,
                    content: "Box breathing works wonders for me - inhale for 4 seconds, hold for 4, exhale for 4, hold for 4, and repeat. Doing this for just 5 minutes can significantly calm your nervous system.",
                    author: "Anonymous",
                    timestamp: new Date(Date.now() - 3600000 * 36).toISOString(),
                    upvotes: 18,
                    downvotes: 1
                }
            ],
            upvotes: 31,
            downvotes: 3,
            saved: false,
            tags: ["mental health", "anxiety", "competition"]
        }
    ];

    // Load sample data and persisted states
    useEffect(() => {
        const storedUpvotes = localStorage.getItem('upvotes');
        const storedDownvotes = localStorage.getItem('downvotes');
        const storedSavedPosts = localStorage.getItem('savedPosts');

        const initialPosts = samplePosts.map(post => ({
            ...post,
            upvotes: storedUpvotes && storedUpvotes[post.id] ? JSON.parse(storedUpvotes)[post.id] : post.upvotes,
            downvotes: storedDownvotes && storedDownvotes[post.id] ? JSON.parse(storedDownvotes)[post.id] : post.downvotes,
            saved: storedSavedPosts && JSON.parse(storedSavedPosts).includes(post.id) ? true : post.saved,
            replies: post.replies.map(reply => ({
                ...reply,
                upvotes: storedUpvotes && storedUpvotes[`reply-${reply.id}`] ? JSON.parse(storedUpvotes)[`reply-${reply.id}`] : reply.upvotes,
                downvotes: storedDownvotes && storedDownvotes[`reply-${reply.id}`] ? JSON.parse(storedDownvotes)[`reply-${reply.id}`] : reply.downvotes,
            }))
        }));

        setTimeout(() => {
            setPosts(initialPosts);
            setLoading(false);
        }, 1000);
    }, []);

    // Handle post creation
    const handleCreatePost = (e) => {
        e.preventDefault();
        if (newPostTitle.trim() && newPostContent.trim()) {
            const tagsArray = newPostTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
            const generatedTags = newPostTitle.toLowerCase().split(' ').filter(word => word.length > 3).slice(0, 3);
            const finalTags = [...new Set([...tagsArray, ...generatedTags])];

            const newPost = {
                id: Date.now(),
                title: newPostTitle,
                content: newPostContent,
                author: currentUser, // Use current user
                timestamp: new Date().toISOString(),
                category: selectedCategory,
                replies: [],
                upvotes: 0,
                downvotes: 0,
                saved: false,
                tags: finalTags
            };
            setPosts([newPost, ...posts]);
            setNewPostTitle('');
            setNewPostContent('');
            setNewPostTags('');
            setShowCreatePost(false);

            // Add notification
            const newNotification = { id: Date.now(), message: "Your post has been published successfully!", type: "success" };
            setNotifications([newNotification, ...notifications]);
            setTimeout(() => {
                setNotifications(prev => prev.filter(notif => notif.id !== newNotification.id));
            }, 5000);
        }
    };

    // Handle reply creation
    const handleReply = (postId) => {
        const replyContent = replyContents[postId];
        if (replyContent && replyContent.trim()) {
            const updatedPosts = posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        replies: [
                            ...post.replies,
                            {
                                id: Date.now(),
                                content: replyContent,
                                author: "Anonymous", // Still anonymous for replies
                                timestamp: new Date().toISOString(),
                                upvotes: 0,
                                downvotes: 0
                            }
                        ]
                    };
                }
                return post;
            });
            setPosts(updatedPosts);

            // Clear the reply input
            setReplyContents({
                ...replyContents,
                [postId]: ''
            });
        }
    };

    // Handle upvotes
    const handleUpvote = (postId, replyId = null) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                if (replyId === null) {
                    return { ...post, upvotes: post.upvotes + 1 };
                } else {
                    return {
                        ...post,
                        replies: post.replies.map(reply => {
                            if (reply.id === replyId) {
                                return { ...reply, upvotes: reply.upvotes + 1 };
                            }
                            return reply;
                        })
                    };
                }
            }
            return post;
        });
        setPosts(updatedPosts);
        // Simulate persistence using local storage
        const upvotes = JSON.parse(localStorage.getItem('upvotes') || '{}');
        upvotes[replyId ? `reply-${replyId}` : postId] = (upvotes[replyId ? `reply-${replyId}` : postId] || 0) + 1;
        localStorage.setItem('upvotes', JSON.stringify(upvotes));
    };

    // Handle downvotes
    const handleDownvote = (postId, replyId = null) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                if (replyId === null) {
                    return { ...post, downvotes: post.downvotes + 1 };
                } else {
                    return {
                        ...post,
                        replies: post.replies.map(reply => {
                            if (reply.id === replyId) {
                                return { ...reply, downvotes: reply.downvotes + 1 };
                            }
                            return reply;
                        })
                    };
                }
            }
            return post;
        });
        setPosts(updatedPosts);
        // Simulate persistence using local storage
        const downvotes = JSON.parse(localStorage.getItem('downvotes') || '{}');
        downvotes[replyId ? `reply-${replyId}` : postId] = (downvotes[replyId ? `reply-${replyId}` : postId] || 0) + 1;
        localStorage.setItem('downvotes', JSON.stringify(downvotes));
    };

    // Handle bookmark/save post
    const handleSavePost = (postId) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return { ...post, saved: !post.saved };
            }
            return post;
        });
        setPosts(updatedPosts);
        // Simulate persistence using local storage
        const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
        if (savedPosts.includes(postId)) {
            localStorage.setItem('savedPosts', JSON.stringify(savedPosts.filter(id => id !== postId)));
        } else {
            localStorage.setItem('savedPosts', JSON.stringify([...savedPosts, postId]));
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.round(diffMs / 1000);
        const diffMin = Math.round(diffSec / 60);
        const diffHour = Math.round(diffMin / 60);
        const diffDay = Math.round(diffHour / 24);

        if (diffSec < 60) {
            return 'just now';
        } else if (diffMin < 60) {
            return `${diffMin}m ago`;
        } else if (diffHour < 24) {
            return `${diffHour}h ago`;
        } else if (diffDay < 7) {
            return `${diffDay}d ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    // Toggle post expansion
    const toggleExpandPost = (postId) => {
        if (expandedPost === postId) {
            setExpandedPost(null);
        } else {
            setExpandedPost(postId);
        }
    };

    // Handle reply input change
    const handleReplyInputChange = (postId, value) => {
        setReplyContents({
            ...replyContents,
            [postId]: value
        });
    };

    // Filter and sort posts
    const filteredPosts = posts.filter(post => {
        const searchLower = searchQuery.toLowerCase();
        return (
            post.title.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower) ||
            post.category.toLowerCase().includes(searchLower) ||
            post.tags.some(tag => tag.includes(searchLower))
        );
    }).filter(post => selectedCategory === 'General' || post.category === selectedCategory); // Filter by selected category

    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (filter === 'latest') {
            return new Date(b.timestamp) - new Date(a.timestamp);
        } else if (filter === 'top') {
            return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        } else if (filter === 'active') {
            return b.replies.length - a.replies.length;
        }
        return 0;
    });

    // Handle closing notifications
    const handleCloseNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    return (
        <div className="community-container">
            {/* Header */}
            <header className="community-header">
                <div className="header-content">
                    <h1> Growth Mantra Community</h1>
                    <p>Share your thoughts and connect with others anonymously</p>

                    {/* Search Bar */}
                    <div className="search-container">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search posts, topics, tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            {/* Notifications */}
            <div className="notifications-container">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`notification ${notification.type}`}
                    >
                        <AlertCircle size={18} />
                        <span>{notification.message}</span>
                        <button className="close-notification" onClick={() => handleCloseNotification(notification.id)}>
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="main-content">
                <aside className="sidebar">
                    <div className="sidebar-section">
                        <h3>Categories</h3>
                        <ul className="category-list">
                            <li
                                key="General"
                                className={selectedCategory === 'General' ? 'active' : ''}
                                onClick={() => setSelectedCategory('General')}
                            >
                                General
                            </li>
                            {categories.filter(cat => cat !== 'General').map(category => (
                                <li
                                    key={category}
                                    className={category === selectedCategory ? 'active' : ''}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <h3>Popular Tags</h3>
                        <div className="tag-cloud">
                            {Array.from(new Set(posts.flatMap(post => post.tags))).slice(0, 10).map(tag => (
                                <span key={tag} className="tag" onClick={() => setSearchQuery(tag)}>
                                    <Tag size={14} />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <h3>Community Stats</h3>
                        <div className="stats">
                            <div className="stat-item">
                                <strong>{posts.length}</strong>
                                <span>Posts</span>
                            </div>
                            <div className="stat-item">
                                <strong>{posts.reduce((sum, post) => sum + post.replies.length, 0)}</strong>
                                <span>Replies</span>
                            </div>
                            <div className="stat-item">
                                <strong>{Math.round(posts.reduce((sum, post) => sum + post.replies.length, 0) / Math.max(posts.length, 1))}</strong>
                                <span>Avg. Engagement</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="content-area">
                    {/* Content Controls */}
                    <div className="content-controls">
                        <div className="filters">
                            <button
                                className={filter === 'latest' ? 'active' : ''}
                                onClick={() => setFilter('latest')}
                            >
                                <Clock size={16} />
                                Latest
                            </button>
                            <button
                                className={filter === 'top' ? 'active' : ''}
                                onClick={() => setFilter('top')}
                            >
                                <TrendingUp size={16} />
                                Top Rated
                            </button>
                            <button
                                className={filter === 'active' ? 'active' : ''}
                                onClick={() => setFilter('active')}
                            >
                                <MessageCircle size={16} />
                                Most Active
                            </button>
                        </div>

                        <button
                            className="create-post-btn"
                            onClick={() => setShowCreatePost(!showCreatePost)}
                        >
                            Create Post
                        </button>
                    </div>

                    {/* Create Post Form */}
                    {showCreatePost && (
                        <div className="create-post-container">
                            <form onSubmit={handleCreatePost}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        placeholder="Enter post title"
                                        value={newPostTitle}
                                        onChange={(e) => setNewPostTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        placeholder="Enter tags (e.g., fitness tips, workout plan)"
                                        value={newPostTags}
                                        onChange={(e) => setNewPostTags(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Content</label>
                                    <textarea
                                        placeholder="Share your thoughts..."
                                        value={newPostContent}
                                        onChange={(e) => setNewPostContent(e.target.value)}
                                        rows={5}
                                        required
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="button" onClick={() => setShowCreatePost(false)}>Cancel</button>
                                    <button type="submit" className="submit-btn">Post</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Posts List */}
                    <div className="posts-container">
                        {loading ? (
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <p>Loading posts...</p>
                            </div>
                        ) : sortedPosts.length === 0 ? (
                            <div className="empty-state">
                                <MessageCircle size={48} />
                                <p>No posts found in this category. Be the first to share your thoughts!</p>
                            </div>
                        ) : (
                            sortedPosts.map(post => (
                                <div key={post.id} className="post-card">
                                    <div className="post-header">
                                        <div className="post-author">
                                            <User size={16} />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="post-meta">
                                            <span className="post-category">{post.category}</span>
                                            <span className="post-timestamp">
                                                <Clock size={14} />
                                                {formatDate(post.timestamp)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="post-content">
                                        <h3>{post.title}</h3>
                                        <p>{post.content}</p>
                                        <div className="post-tags">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="tag">
                                                    <Tag size={14} />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="post-actions">
                                        <button onClick={() => handleUpvote(post.id)}>
                                            <ThumbsUp size={16} />
                                            <span>{post.upvotes}</span>
                                        </button>
                                        <button onClick={() => handleDownvote(post.id)}>
                                            <ThumbsDown size={16} />
                                            <span>{post.downvotes}</span>
                                        </button>
                                        <button onClick={() => toggleExpandPost(post.id)}>
                                            <MessageCircle size={16} />
                                            <span>{post.replies.length}</span>
                                        </button>
                                        <button onClick={() => handleSavePost(post.id)}>
                                            <Bookmark size={16} />
                                            <span>{post.saved ? 'Saved' : 'Save'}</span>
                                        </button>
                                        <button>
                                            <Share size={16} />
                                            <span>Share</span>
                                        </button>
                                        <button>
                                            <Flag size={16} />
                                            <span>Report</span>
                                        </button>
                                    </div>

                                    {/* Replies Section */}
                                    {expandedPost === post.id && (
                                        <div className="replies-section">
                                            <div className="reply-input">
                                                <textarea
                                                    placeholder="Reply anonymously..."
                                                    value={replyContents[post.id] || ''}
                                                    onChange={(e) => handleReplyInputChange(post.id, e.target.value)}
                                                />
                                                <button
                                                    className="send-reply-btn"
                                                    onClick={() => handleReply(post.id)}
                                                >
                                                    <Send size={16} />
                                                </button>
                                            </div>

                                            <div className="replies-list">
                                                {post.replies.map(reply => (
                                                    <div key={reply.id} className="reply-card">
                                                        <div className="reply-content">
                                                            <p>{reply.content}</p>
                                                            <div className="reply-meta">
                                                                <span className="reply-author">
                                                                    <User size={14} />
                                                                    {reply.author}
                                                                </span>
                                                                <span className="reply-timestamp">
                                                                    <Clock size={14} />
                                                                    {formatDate(reply.timestamp)}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="reply-actions">
                                                            <button onClick={() => handleUpvote(post.id, reply.id)}>
                                                                <ThumbsUp size={14} />
                                                                <span>{reply.upvotes}</span>
                                                            </button>
                                                            <button onClick={() => handleDownvote(post.id, reply.id)}>
                                                                <ThumbsDown size={14} />
                                                                <span>{reply.downvotes}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Community;