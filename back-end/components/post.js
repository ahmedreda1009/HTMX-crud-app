const renderPost = ({ id, title, content }) => {
  return `
    <!-- Card -->
    <div class="bg-white shadow-md rounded overflow-hidden" id="post-${id}">
      <!-- Card Content -->
      <div class="p-4">
        <!-- Title -->
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">${title}</h2>
        <!-- Content -->
        <p class="text-gray-600">${content}</p>
      </div>
      <!-- Card Actions -->
      <div class="px-4 py-2 bg-gray-100 flex justify-end">
        <!-- Delete Button --> 
        <button class="px-4 text-red-600 hover:text-red-900 mr-2" hx-delete="http://localhost:4545/blogs/delete/${id}" hx-target="#post-${id}" hx-swap="outerHTML">Delete</button>
        <!-- Edit Button -->
        <button class="text-blue-500 hover:text-blue-900" hx-get="http://localhost:4545/blogs/edit/${id}" hx-target="#post-${id}">Edit</button>
      </div>
    </div>
`;
};

module.exports = renderPost;
