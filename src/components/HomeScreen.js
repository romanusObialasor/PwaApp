import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import "antd/dist/antd.css";
import app from "../base";
import DeleteIcon from "@material-ui/icons/Delete";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  const post = async () => {
    await app.firestore().collection("attendance").doc().set({
      name: text,
    });
    setText("");
  };

  const deleteItem = async (id) => {
    await app.firestore().collection("attendance").doc(id).delete();
  };

  const getData = async () => {
    await app
      .firestore()
      .collection("attendance")
      .onSnapshot((snapshot) => {
        const item = [];
        snapshot.forEach((doc) => {
          item.push({ ...doc.data(), id: doc.id });
        });
        setData(item);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Inputer
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Add..."
      />
      <ButtonHolder onClick={post} type="primary">
        Submit
      </ButtonHolder>
      {data.map((result) => (
        <Wrapper key={result.id}>
          <Text>{result.name}</Text>
          <Icon
            onClick={() => {
              deleteItem(result.id);
            }}
          />
        </Wrapper>
      ))}
    </Container>
  );
};

export default HomeScreen;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  background-image: url("/2.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: overlay;
`;

const Inputer = styled(Input)`
  width: 500px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const ButtonHolder = styled(Button)`
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  width: 500px;
  height: 50px;
  background: white;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 10px;
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    width: 90%;
    height: 40px;
  }
`;

const Text = styled.span`
  flex: 1;
  font-weight: bold;
`;

const Icon = styled(DeleteIcon)`
  cursor: pointer;
  color: red;
`;
