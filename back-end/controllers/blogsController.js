const BlogModel = require("../models/blogsModel");
const renderPost = require("../components/post");

exports.getAllPosts = async (req, res) => {
  // res.end("I WANT MY POSTS NOW");
  try {
    const posts = await BlogModel.find();
    const postsHTML = posts.map((post) => {
      return renderPost({
        id: post.id,
        title: post.title,
        content: post.content,
      });
    });
    res.send(postsHTML.join(""));
  } catch (error) {
    res.status(404).json({
      staus: "failed",
    });
  }
};

exports.postNewPost = async (req, res) => {
  try {
    const newPost = await BlogModel.create(req.body);
    // console.log(newPost);
    // console.log(req.body);

    res.send(
      renderPost({
        id: newPost.id,
        title: newPost.title,
        content: newPost.content,
      }),
    );
  } catch (error) {
    res.status(404).json({
      staus: "failed",
    });
  }
};

exports.editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await BlogModel.findById(postId);
    console.log("edit post clg", post);
    // res.send("edit post now" + postId);
    const form = `
  <div class="p-4">
<form hx-post="http://localhost:4545/blogs/update/${postId}" hx-vals=".formdiv" hx-target="#post-${postId}">
      <div class="formdiv">
        <input name="id" type="hidden" value="${postId}" />
        <div class="mb-4">
          <label for="title" class="block text-gray-700 font-semibold mb-2">Title</label>
          <input type="text" id="title" name="title"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter title" required value="${post.title}" />
        </div>
        <div class="mb-6">
          <label for="content" class="block text-gray-700 font-semibold mb-2">Content</label>
          <textarea id="content" name="content"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" rows="4"
            placeholder="Enter content" required>${post.content}</textarea>
        </div>
        <div>
          <button class="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-500">
            Update Post
          </button>
        </div>
      </div>
    </form>
  </div>
`;
    res.set("HX-Trigger", "post_update");
    res.send(form);
  } catch (error) {
    res.status(404).json({
      staus: "failed",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    console.log("update", req.body);
    // res.send("update post please");
    const { postId } = req.params;
    const { title, content } = req.body;
    const newPost = await BlogModel.findOneAndUpdate(
      { _id: postId },
      { title, content },
      {
        new: true,
      },
    );
    console.log("newpost", newPost);
    res.send(renderPost(newPost));
  } catch (error) {
    res.status(404).json({
      staus: "failed",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await BlogModel.findByIdAndDelete(postId);
    res.set("HX-Trigger", "post_delete");
    res.send("");
  } catch (error) {
    res.status(404).json({
      staus: "failed",
    });
  }
};
