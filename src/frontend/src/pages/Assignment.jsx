import React, { useState, useEffect, useRef } from "react";
import { Box, Heading, Layer as GrommetLayer } from "grommet";
import { Stage, Layer, Image, Circle } from "react-konva";
import useImage from "use-image";

const url =
  "https://images.unsplash.com/photo-1620416417410-5e467e5dbd25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib";

const Assignment = () => {
  const boxRef = useRef(null);
  const [image, setImage] = useImage(url);
  const [stageDimensions, setStageDimensions] = useState(undefined);
  const [scaledImage, setScaledImage] = useState(undefined);

  useEffect(() => {
    if (boxRef.current) {
      let height = boxRef.current.offsetHeight;
      let width = boxRef.current.offsetWidth;

      console.log({ height, width });
      setStageDimensions({ width, height });
    }
    return () => {
      //cleanup
    };
  }, [boxRef]);

  useEffect(() => {
    console.log("image loaded");
    console.log({ image, stageDimensions });
    if (image && stageDimensions) {
      let scaledImage = calculateImagePos(
        stageDimensions.width,
        stageDimensions.height,
        image.width,
        image.height
      );
      console.log({ scaledImage });
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

  return (
    <Box fill>
      <Heading>Assignment</Heading>
      <Box direction={"row-responsive"} fill>
        <Box ref={boxRef} fill background={"light-4"} overflow={"hidden"}>
          {stageDimensions && (
            <Stage
              width={stageDimensions.width}
              height={stageDimensions.height}
            >
              <Layer>
                {image && scaledImage && (
                  <Image
                    image={image}
                    x={scaledImage.x}
                    y={scaledImage.y}
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
              </Layer>
            </Stage>
          )}
        </Box>
        <Box fill background={"light-2"}>
          form
        </Box>
      </Box>
    </Box>
  );
};

export default Assignment;
