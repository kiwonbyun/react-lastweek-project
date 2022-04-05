import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { firestore } from "./shared/firebase";
const Detail = () => {
  const id = useParams();

  const [data, setData] = useState("");
  React.useEffect(() => {
    const postDB = firestore.collection("post");
    postDB
      .doc(id.id)
      .get()
      .then((doc) => {
        const post_data = doc.data();
        setData(post_data);
      });
  }, []);

  return (
    <div>
      <Card>
        <div>
          <img src={data.user_profile}></img>
          <h3>{data.user_name}</h3>
          <span>{data.insert_dt}</span>
        </div>
        <div>
          <span>{data.contents}</span>
          <img src={data.image_url}></img>
        </div>
      </Card>
    </div>
  );
};

const Card = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 30px;
  background-color: gray;
  padding: 20px;
  div {
    &:first-child {
      display: flex;
      justify-content: space-between;
    }
    &:nth-child(2) {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      img {
        margin: auto;
        margin-top: 20px;
        width: 80%;
      }
    }
  }
`;

export default Detail;
