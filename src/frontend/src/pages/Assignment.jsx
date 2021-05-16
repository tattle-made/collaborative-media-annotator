import React, { useState, useEffect, useRef } from "react";
import { Box, Heading, Button, Avatar, Text } from "grommet";
import { Stage, Layer, Image, Circle, Rect } from "react-konva";
import useImage from "use-image";
import FormBuilder from "../components/FormBuilder";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api_url } from "../config/default.json";
import socketIOClient from "socket.io-client";
import { useStore } from "../store/global";

const url =
  "https://images.unsplash.com/photo-1620416417410-5e467e5dbd25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib";

const AnnotationForm = ({ schema, socket }) => {
  return (
    <>
      <FormBuilder formData={schema} socket={socket} />
    </>
  );
};

const Assignment = () => {
  const boxRef = useRef(null);
  const stageRef = useRef(null);
  let { exerciseId } = useParams();
  const [image, setImage] = useImage(url);
  const [stageDimensions, setStageDimensions] = useState(undefined);
  const [scaledImage, setScaledImage] = useState(undefined);
  const [currentRect, updateCurrentRect] = useState({
    track: false,
    type: undefined,
    id: undefined,
    start: undefined,
    end: undefined,
  });
  const [rectangles, setRectangles] = useState([]);

  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [schema, setSchema] = useState([]);

  const [socket, setSocket] = useState(undefined);
  const [participants, setParticipants] = useState([]);
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    console.log("CONNECT to socket");
    const skt = socketIOClient(api_url);
    skt.on("join", (msg) => {
      console.log("rcvd", msg);
      setParticipants(msg);
    });
    setSocket(skt);
  }, []);

  useEffect(() => {
    console.log({ currentUser, posts, currentPostIndex });
    // console.log({
    //   HI: "hi",
    //   name: currentUser.name,
    //   exerciseId,
    //   postId: posts,
    //   ix: currentPostIndex,
    // });
    if (currentUser && posts.length != 0) {
      console.log("JOIN SEND");
      socket.emit("join", {
        name: currentUser.name,
        exerciseId,
        postId: posts[currentPostIndex].id,
      });
    }
  }, [posts]);

  useEffect(async () => {
    const exerciseRes = (await axios.get(`${api_url}/exercise/${exerciseId}`))
      .data;
    // console.log(exerciseRes);
    setPosts(exerciseRes.posts);
    setSchema(exerciseRes.schema);
  }, []);

  useEffect(() => {
    if (boxRef.current) {
      let height = boxRef.current.offsetHeight;
      let width = boxRef.current.offsetWidth;

      setStageDimensions({ width, height });
    }
  }, [boxRef]);

  useEffect(() => {
    // console.log("image loaded");
    // console.log({ image, stageDimensions });
    if (image && stageDimensions) {
      let scaledImage = calculateImagePos(
        stageDimensions.width,
        stageDimensions.height,
        image.width,
        image.height
      );
      // console.log({ scaledImage });
      setScaledImage(scaledImage);
    }

    return () => {
      //cleanup
    };
  }, [image, stageDimensions]);

  function calculateImagePos(
    containerWidth,
    containerHeight,
    imageWidth,
    imageHeight
  ) {
    let height = containerWidth * (imageHeight / imageWidth);
    let width = containerWidth;

    let x = containerWidth / 2 - width / 2;
    let y = containerHeight / 2 - height / 2;
    return { x, y, height, width };
  }

  function mouseUp(e) {
    console.log("mouse up");

    let n = [];
    n = [...rectangles, currentRect];
    setRectangles(n);

    console.log({ n });

    updateCurrentRect({
      ...currentRect,
      track: false,
    });

    // console.log({ rectangles: rectangles });
  }

  function mouseDown(e) {
    const pos = e.target.getStage().getPointerPosition();
    console.log("mouse down");
    updateCurrentRect({
      track: true,
      type: undefined,
      id: undefined,
      start: { x: pos.x, y: pos.y },
      end: { x: pos.x, y: pos.y },
    });
  }

  function btnClicked() {
    // console.log(stageRef.current.toJSON());
    console.log({ rectangles });
  }

  function mouseMove(e) {
    if (currentRect.track) {
      const pos = e.target.getStage().getPointerPosition();
      console.log("mouse move");
      updateCurrentRect({
        ...currentRect,
        end: { x: pos.x, y: pos.y },
      });
    }
  }

  return (
    <Box fill>
      <Heading>Assignment</Heading>
      <Box
        className="participants"
        direction={"row-responsive"}
        gap={"xxsmall"}
      >
        {participants &&
          participants.map((participant, ix) => (
            <Avatar key={ix} background={"light-3"} size={"small"}>
              <Text size={"xsmall"}>
                {participant
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </Text>
            </Avatar>
          ))}
      </Box>
      <Box direction={"row-responsive"} fill>
        <Box ref={boxRef} fill background={"light-4"} overflow={"hidden"}>
          {stageDimensions && (
            <Stage
              ref={stageRef}
              width={stageDimensions.width}
              height={stageDimensions.height}
              onMouseDown={mouseDown}
              onMouseUp={mouseUp}
              onMouseMove={mouseMove}
            >
              <Layer>
                {image && scaledImage && (
                  <Image
                    image={image}
                    x={0}
                    y={0}
                    height={
                      calculateImagePos(
                        stageDimensions.width,
                        stageDimensions.height,
                        image.width,
                        image.height
                      ).height
                    }
                    width={
                      calculateImagePos(
                        stageDimensions.width,
                        stageDimensions.height,
                        image.width,
                        image.height
                      ).width
                    }
                  />
                )}
                <Circle x={0} y={0} radius={10} fill={"red"} />
                <Circle
                  x={window.innerWidth / 2}
                  y={0}
                  radius={10}
                  fill={"red"}
                />
                <Circle
                  x={stageDimensions.width}
                  y={stageDimensions.height}
                  radius={10}
                  fill={"red"}
                />
                <Circle
                  x={0}
                  y={stageDimensions.height}
                  radius={10}
                  fill={"red"}
                />
                {currentRect.track && (
                  <Rect
                    x={currentRect.start.x}
                    y={currentRect.start.y}
                    width={currentRect.end.x - currentRect.start.x}
                    height={currentRect.end.y - currentRect.start.y}
                    stroke="red"
                    strokeWidth={2}
                  />
                )}
                {rectangles.map((rectangle, index) => {
                  console.log(rectangle);
                  return (
                    <Rect
                      key={index}
                      x={rectangle.start.x}
                      y={rectangle.start.y}
                      width={rectangle.end.x - rectangle.start.x}
                      height={rectangle.end.y - rectangle.start.y}
                      stroke="blue"
                      strokeWidth={2}
                    ></Rect>
                  );
                })}
              </Layer>
              <Layer>
                {/* <Rect
                  x={100}
                  y={100}
                  fill={"red"}
                  width={100}
                  height={100}
                ></Rect> */}
              </Layer>
            </Stage>
          )}
        </Box>
        <Box fill pad={{ right: "xsmall", left: "xsmall" }}>
          {/* <Button onClick={btnClicked} label={"test"} /> */}
          <AnnotationForm schema={schema} socket={socket} />
        </Box>
      </Box>
    </Box>
  );
};

export default Assignment;
