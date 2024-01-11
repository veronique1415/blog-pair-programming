const express = require('express');
const router = express.Router();
const fs = require("fs");
const blogDataFile = "./data/blogs.json";

const getBlogs = () => {
	// Read the contents of the JSON file
	const data = fs.readFileSync(blogDataFile);
	// Parse the JSON data into a JavaScript object
	const jsonData = JSON.parse(data);

	return jsonData;
};

router.get("/", (req, res)=>{
    const blogData = getBlogs();

	const blogList = blogData.map(({ id, title, image }) => ({
		id,
		title,
		image,
	}));
	res.status(200).json(blogList);
})

router.get("/:id", (req, res) => {
	const blogData = getBlogs();
	const { id } = req.params;
	const blog = blogData.filter((blog) => blog.id === id);
	if (!blog?.length) {
		res.status(404).send({ msg: "No blog found" });
		return;
	}
	res.status(200).json(blog);
});

module.exports = router;