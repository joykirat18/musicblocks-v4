import p5 from 'p5';
import { useEffect } from 'react';
import { rootCertificates } from 'tls';

function sketch0(sketch: p5) {
  // Dummy buttons just to just the functions
  let moveLeftButton: p5.Element;
  let moveUpButton: p5.Element;
  let moveDownButton: p5.Element;
  let moveRightButton: p5.Element;
  let refreshButton: p5.Element;
  let rotateButton: p5.Element;

  // x and y position of the rectangle that can be controlled by the buttons
  let xPosition = 500;
  let yPosition = 300;

  // virtual canvas created by p5 using createGraphics to render the line drawn
  let extraCanvas: p5.Graphics;

  // Stores the rectangle drawn
  let shape: import('p5');

  // how much the rectangle should be displaced in one function call
  let displacement = 15;

  let angle = 0;

  /**
   * Move rect left and draw a stroke
   */
  function moveLeft() {
    extraCanvas.line(xPosition, yPosition, xPosition - displacement, yPosition);
    xPosition -= displacement;
  }
  /**
   * Move rect up and draw a stroke
   */
  function moveUp() {
    extraCanvas.line(xPosition, yPosition, xPosition, yPosition - displacement);
    yPosition -= displacement;
  }
  /**
   * Move rect down and draw a stroke
   */
  function moveDown() {
    extraCanvas.line(xPosition, yPosition, xPosition, yPosition + displacement);
    yPosition += displacement;
  }
  /**
   * Move rect right and draw a stroke
   */
  function moveRight() {
    extraCanvas.line(xPosition, yPosition, xPosition + displacement, yPosition);
    xPosition += displacement;
  }
  /**
   * refresh the strokes drawn
   */
  function refresh() {
    extraCanvas.clear();
  }

  function rotate() {
    angle += 90;
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

    rotateButton = sketch.createButton('Rotate 90');
    rotateButton.mousePressed(rotate);
    rotateButton.position(800, 0);
  }
  sketch.setup = () => {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    extraCanvas = sketch.createGraphics(sketch.windowWidth, sketch.windowHeight);
    extraCanvas.clear();
    sketch.background(0);
    sketch.angleMode(sketch.DEGREES);
    sketch.rectMode(sketch.CENTER);
    renderButtons();
  };
  sketch.draw = () => {
    sketch.background(0);
    extraCanvas.stroke(255);
    extraCanvas.strokeWeight(10);

    sketch.image(extraCanvas, 0, 0);
    sketch.stroke(255);

    // Translate lets you change the point of origin to the rectangle
    sketch.translate(xPosition, yPosition);
    // We specify the angle by which we rotate the shape
    sketch.rotate(angle);

    shape = sketch.rect(0, 0, 50, 100);

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
