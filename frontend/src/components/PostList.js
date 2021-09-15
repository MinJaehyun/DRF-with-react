import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "./Post";

const apiUrl = "http://localhost:8000/api/posts/";  // FIXME: 배포주소로 변경하기

function PostList() {
    const [postList, setPostList] = useState([]);

    useEffect(()=>{
        Axios.get(apiUrl)
        .then(response => {
            // console.log("loaded response:", response)
            const { data } = response;
            
            setPostList(data)
        })
        .catch(error => {
            // console.log(error.response);
        })
    }, [])

    return (
        <div>
            <h3>PostList</h3>
            {
                postList.map(post => {
                    return <Post post={post} key={post.id} />             
            })};
        </div>
    )
}

export default PostList;
