import p5 from 'p5';
import { useEffect } from 'react';

function sketch0(sketch: p5) {
  // Dummy buttons just to just the functions
  let moveLeftButton: p5.Element;
  let moveUpButton: p5.Element;
  let moveDownButton: p5.Element;
  let moveRightButton: p5.Element;
  let refreshButton: p5.Element;

  // x and y position of the rectangle that can be controlled by the buttons
  let xPosition = 500;
  let yPosition = 300;

  // virtual canvas created by p5 using createGraphics to render the line drawn
  let extraCanvas: p5.Graphics;

  // Stores the rectangle drawn
  let shape: import('p5');

  // Stores the center of the rectangle
  let centerX: number;
  let centerY: number;

  // how much the rectangle should be displaced in one function call
  let displacement = 15;

  /**
   * Move rect left and draw a stroke
   */
  function moveLeft() {
    extraCanvas.line(centerX, centerY, centerX - displacement, centerY);
    xPosition -= displacement;
  }
  /**
   * Move rect up and draw a stroke
   */
  function moveUp() {
    extraCanvas.line(centerX, centerY, centerX, centerY - displacement);
    yPosition -= displacement;
  }
  /**
   * Move rect down and draw a stroke
   */
  function moveDown() {
    extraCanvas.line(centerX, centerY, centerX, centerY + displacement);
    yPosition += displacement;
  }
  /**
   * Move rect right and draw a stroke
   */
  function moveRight() {
    extraCanvas.line(centerX, centerY, centerX + displacement, centerY);
    xPosition += displacement;
  }
  /**
   * refresh the strokes drawn
   */
  function refresh() {
    extraCanvas.clear();
  }
  // function to render the buttons, called in stup function
  function renderButtons() {
    moveLeftButton = sketch.createButton('Move Left');
    moveLeftButton.mousePressed(moveLeft);
    moveLeftButton.position(300, 0);

    moveRightButton = sketch.createButton('Move Right');
    moveRightButton.mousePressed(moveRight);
    moveRightButton.position(400, 0);

    moveUpButton = sketch.createButton('Move Up');
    moveUpButton.mousePressed(moveUp);
    moveUpButton.position(500, 0);

    moveDownButton = sketch.createButton('Move Down');
    moveDownButton.mousePressed(moveDown);
    moveDownButton.position(600, 0);

    refreshButton = sketch.createButton('Refresh');
    refreshButton.mousePressed(refresh);
    refreshButton.position(700, 0);
  }
  sketch.setup = () => {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    extraCanvas = sketch.createGraphics(sketch.windowWidth, sketch.windowHeight);
    extraCanvas.clear();
    sketch.background(0);

    renderButtons();
  };
  sketch.draw = () => {
    sketch.background(0);
    extraCanvas.stroke(255);
    extraCanvas.strokeWeight(10);

    sketch.image(extraCanvas, 0, 0);
    sketch.stroke(255);
    shape = sketch.rect(xPosition, yPosition, 50, 50);

    // Here 25 is used to draw the stroke from the center of the rectangle.
    centerX = xPosition + 25;
    centerY = yPosition + 25;
    shape.stroke(0);
    shape.strokeWeight(5);
    shape.noFill();
  };
}

export default function (props: { index: number }): JSX.Element {
  const id = `p5-board-${props.index}`;

  useEffect(() => {
    new p5(sketch0, document.getElementById(id) as HTMLElement);
  }, []);

  return <div id={id}></div>;
}
