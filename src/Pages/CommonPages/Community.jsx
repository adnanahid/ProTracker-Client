import React, { useState, useEffect } from "react";
import useCheckRole from "../../CustomHooks/useCheckRole";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";

const Community = () => {
  const { clientDetails } = useCheckRole();
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [openComments, setOpenComments] = useState({}); // State for toggling comments

  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosSecure.get("/community-post");
        const formattedPosts = res.data.map((post) => ({
          ...post,
          comments: post.comments || [],
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const post = {
      name: clientDetails?.name,
      dp: clientDetails?.photo,
      post: e.target.post.value,
      date: new Date(),
      comments: [],
    };

    const res = await axiosSecure.post("/community-post", post);
    if (res.data.insertedId) {
      setPosts((prev) => [...prev, post]);
      e.target.reset();
    }
  };

  const handleCommentSubmit = async (postId, commentText) => {
    const newComment = {
      postId,
      comment: commentText,
      name: clientDetails?.name,
      dp: clientDetails?.photo,
    };

    const res = await axiosSecure.post("/community-comment", newComment);

    if (res.data.acknowledged) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen pt-20 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Community Discussion
      </h1>

      {/* Post Form */}
      <div className="max-w-screen-sm mx-auto p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Post a Problem
        </h2>
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <textarea
            placeholder="Describe your problem..."
            name="post"
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
          <button
            disabled={!clientDetails}
            type="submit"
            className="w-full py-3 bg-[#191919] text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Post
          </button>
        </form>
      </div>

      {/* Display Posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {posts.length === 0 ? (
          <p className="text-gray-600 text-center">
            No posts yet. Be the first to ask a question!
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="p-6 border-2 border-gray-200 rounded-lg shadow-lg bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={post.dp}
                  alt={post.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {post.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mt-4">{post.post}</p>

              {/* Show/Hide Comment Button */}
              <button
                onClick={() =>
                  setOpenComments((prev) => ({
                    ...prev,
                    [post._id]: !prev[post._id],
                  }))
                }
                className="mt-4 w-full py-2 bg-[#191919] text-gray-100 font-semibold rounded-md hover:bg-gray-400 transition duration-200"
              >
                {openComments[post._id] ? "Hide Comments" : "Show Comments"}
              </button>

              {/* Comment Section (Toggle Visibility) */}
              {openComments[post._id] && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Comments
                  </h4>
                  {post.comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {post.comments.map((comment, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <img
                            src={comment.dp}
                            alt={comment.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="space-y-1">
                            <h5 className="text-sm font-semibold text-gray-800">
                              {comment.name}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const comment = e.target.elements.comment.value;
                      if (comment) {
                        handleCommentSubmit(post._id, comment);
                        e.target.reset();
                      }
                    }}
                    className="mt-4"
                  >
                    <input
                      type="text"
                      name="comment"
                      placeholder="Write a comment..."
                      className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="mt-3 w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
                    >
                      Comment
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;
