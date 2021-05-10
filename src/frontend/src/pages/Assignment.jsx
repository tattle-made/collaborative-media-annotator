import React, { useState, useEffect, useRef } from "react";
import { Box, Heading } from "grommet";
import { Stage, Layer, Rect, Circle, Image } from "react-konva";
import useImage from "use-image";

const scaleBy = 1.5;

const url =
  "https://images.unsplash.com/photo-1620416417410-5e467e5dbd25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib";

const Assignment = () => {
  const [image, setImage] = useImage(url);
  const [imageDimensions, setImageDimensions] = useState(undefined);
  const stageRef = useRef(null);
  const [currentRect, updateCurrentRect] = useState({
    track: false,
    type: undefined,
    id: undefined,
    start: undefined,
    end: undefined,
  });
  const [rectangles, setRectangles] = useState([]);

  useEffect(() => {
    if (image) {
      console.log({ w: image.width, h: image.height });
    }
    return () => {
      //cleanup
    };
  }, [image]);

  function zoomStage(event) {
    event.evt.preventDefault();
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      console.log(stage.scaleX());
      // if (stage.scaleX() > 10) {
      //   return;
      // }
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale =
        event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
    }
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

  function drawRect(e) {
    // console.log({ x: e.evt.x, y: e.evt.y });
    // console.log(e);
    // console.log(currentRect);
    const pos = e.target.getStage().getPointerPosition();
    if (!currentRect.track && e.type === "mousedown") {
      console.log("lets begin tracking");
      updateCurrentRect({
        track: true,
        type: undefined,
        id: undefined,
        start: { x: pos.x, y: pos.y },
        end: { x: pos.x, y: pos.y },
      });
    }
    if (currentRect.track && e.type === "mousemove") {
      updateCurrentRect({
        ...currentRect,
        end: { x: pos.x, y: pos.y },
      });
      console.log(currentRect);
    }
    if (currentRect.track && e.type === "mouseup") {
      updateCurrentRect({
        ...currentRect,
        track: false,
      });
      console.log("lets end tracking", currentRect);
      // let n = [];
      // n = [...rectangles, currentRect];
      // setRectangles(n);
      // console.log({ rectangles: rectangles });
    }
    // updateCurrentRect({
    //   track: false,
    //   type: undefined,
    //   id: undefined,
    //   start: undefined,
    //   end: undefined,
    // });
  }

  return (
    <Box fill>
      <Heading>Assignment</Heading>
      <Box direction={"row"}>
        <Box flex={true} height={"100%"} background={"brand"}>
          <Stage
            width={400}
            height={400}
            onWheel={zoomStage}
            ref={stageRef}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseMove={mouseMove}
          >
            <Layer>
              {image && (
                <Image
                  image={image}
                  width={image.width}
                  height={image.height}
                />
              )}
              {/* <Circle x={200} y={200} stroke="black" radius={50} /> */}
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
          </Stage>
        </Box>

        <Box flex={true}>form</Box>
      </Box>
    </Box>
  );
};

export default Assignment;
