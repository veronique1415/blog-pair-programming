const express = require('express');
const router = express.Router();
const fs = require("fs");
const blogDataFile = "./data/blogs.json";
const { v4: uuidv4 } = require('uuid');


const getBlogs = () => {
	// Read the contents of the JSON file
	const data = fs.readFileSync(blogDataFile);
	// Parse the JSON data into a JavaScript object
	const jsonData = JSON.parse(data);

	return jsonData;
};

const addBlogPost = (newPost) => {
    const blogData = getBlogs();
    blogData.push(newPost);

    const jsonString = JSON.stringify(blogData);
    fs.writeFileSync(blogDataFile, jsonString);
    return newPost.id;
}

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
	const blog = blogData.find((blog) => blog.id === id);
    console.log(blog);
	if (!blog) {
		res.status(404).send({ msg: "No blog found" });
		return;
	}
	res.status(200).json(blog);
});

router.post("/create", (req, res) => {
    const postBody = req.body;
    const newPost = {
        ...postBody,
        id: uuidv4(),
        timestamp: Date.now(),
        image:"http://localhost:8081/images/Romy.jpg"
    }
    
    //write to json file
    const blogId = addBlogPost(newPost);
    if(!blogId){
        res.status(400).json("error adding post");
        return;
    }
    res.status(201).json(newPost);
})

module.exports = router;