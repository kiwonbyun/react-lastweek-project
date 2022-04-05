import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Detail = () => {
  const id = useParams();
  console.log(id.id);
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);
  const post_index = post_list.findIndex((p) => p.id === id.id);
  const post = post_list[post_index];
  console.log(post);
  return <div></div>;
};

export default Detail;
