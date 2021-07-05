import p5 from 'p5';
import { useEffect } from 'react';

function sketch0(sketch: p5) {
  // Dummy buttons just to just the functions
  let moveLeftButton: p5.Element;
  let moveUpButton: p5.Element;
  let moveDownButton: p5.Element;
  let moveRightButton: p5.Element;
  let refreshButton: p5.Element;
  let rotateButton: p5.Element;
  let scaleUpButton: p5.Element;
  let scaleDownButton: p5.Element;
  let makeArcButton: p5.Element;

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

  let scale = 1;

  let arcStart = 0;
  let arcEnd = 0;

  let initialRadiusX = 500;
  let initialRadiusY = 300;
  let radiusX = initialRadiusX - 100;
  let radiusY = initialRadiusY;

  function updateCenter() {
    if (angle % (2 * sketch.PI) === 0) {
      radiusX = initialRadiusX - 100;
      radiusY = initialRadiusY;
      arcStart = 0;
      arcEnd = 0;
    }
    if (angle % (2 * sketch.PI) === sketch.PI / 2) {
      radiusY = initialRadiusY + 100;
      radiusX = initialRadiusX;
      arcStart = -sketch.PI / 2;
      arcEnd = -sketch.PI / 2;
    }
    if (angle % (2 * sketch.PI) == sketch.PI) {
      radiusX = initialRadiusX + 100;
      radiusY = initialRadiusY;
      arcStart = sketch.PI;
      arcEnd = sketch.PI;
    }
    if (angle % (2 * sketch.PI) == (3 * sketch.PI) / 2) {
      radiusY = initialRadiusY - 100;
      radiusX = initialRadiusX;
      arcStart = -3 * (sketch.PI / 2);
      arcEnd = -3 * (sketch.PI / 2);
    }
  }

  /**
   * Move rect left and draw a stroke
   */
  function moveLeft() {
    extraCanvas.line(xPosition, yPosition, xPosition - displacement, yPosition);
    xPosition -= displacement;
    initialRadiusX -= displacement;
    updateCenter();
    // yPosition -= displacement;
  }
  /**
   * Move rect up and draw a stroke
   */
  function moveUp() {
    extraCanvas.line(xPosition, yPosition, xPosition, yPosition - displacement);
    yPosition -= displacement;
    initialRadiusY -= displacement;
    updateCenter();
  }
  /**
   * Move rect down and draw a stroke
   */
  function moveDown() {
    extraCanvas.line(xPosition, yPosition, xPosition, yPosition + displacement);
    yPosition += displacement;
    initialRadiusY += displacement;
    updateCenter();
  }
  /**
   * Move rect right and draw a stroke
   */
  function moveRight() {
    extraCanvas.line(xPosition, yPosition, xPosition + displacement, yPosition);
    xPosition += displacement;
    initialRadiusX += displacement;
    updateCenter();
  }
  /**
   * refresh the strokes drawn
   */
  function refresh() {
    extraCanvas.clear();
  }

  function rotate() {
    angle += sketch.PI / 2;
    updateCenter();
  }

  function scaleUp() {
    scale += 0.1;
  }

  function scaleDown() {
    scale -= 0.1;
  }

  function makeArc() {
    arcEnd += (sketch.PI / 4.0) % (2 * sketch.PI);
    if (angle % (2 * sketch.PI) === 0) {
      yPosition += 100 * sketch.cos(arcEnd);
      xPosition -= 100 * sketch.sin(arcEnd);
    }
    if (angle % (2 * sketch.PI) === sketch.PI / 2) {
      yPosition += 100 * sketch.cos(arcEnd);
      xPosition -= 100 * sketch.sin(arcEnd);
    }
    if (angle % (2 * sketch.PI) == sketch.PI) {
      yPosition += 100 * sketch.cos(arcEnd);
      xPosition -= 100 * sketch.sin(arcEnd);
    }
    if (angle % (2 * sketch.PI) == (3 * sketch.PI) / 2) {
      yPosition += 100 * sketch.cos(arcEnd);
      xPosition -= 100 * sketch.sin(arcEnd);
    }
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

    scaleUpButton = sketch.createButton('Scale Up');
    scaleUpButton.mousePressed(scaleUp);
    scaleUpButton.position(900, 0);

    scaleDownButton = sketch.createButton('Scale Down');
    scaleDownButton.mousePressed(scaleDown);
    scaleDownButton.position(1000, 0);

    makeArcButton = sketch.createButton('Make Arc');
    makeArcButton.mousePressed(makeArc);
    makeArcButton.position(1100, 0);
  }
  sketch.setup = () => {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    extraCanvas = sketch.createGraphics(sketch.windowWidth, sketch.windowHeight);
    extraCanvas.clear();
    sketch.background(0);
    // sketch.angleMode(sketch.DEGREES);
    sketch.rectMode(sketch.CENTER);
    renderButtons();
  };
  sketch.draw = () => {
    sketch.background(0);
    extraCanvas.stroke(255, 0, 0);
    extraCanvas.strokeWeight(5 + 5 * scale);

    sketch.image(extraCanvas, 0, 0);
    sketch.stroke(255);

    // Translate lets you change the point of origin to the rectangle
    sketch.translate(xPosition, yPosition);
    // We specify the angle by which we rotate the shape
    sketch.rotate(angle);

    sketch.scale(scale);
    shape = sketch.rect(0, 0, 50, 100);

    shape.stroke(0);
    shape.strokeWeight(5);
    shape.noFill();
    extraCanvas.noFill();
    extraCanvas.arc(radiusX, radiusY, 200, 200, arcStart, arcEnd, sketch.OPEN);
  };
}

export default function (props: { index: number }): JSX.Element {
  const id = `p5-board-${props.index}`;

  useEffect(() => {
    new p5(sketch0, document.getElementById(id) as HTMLElement);
  }, []);

  return <div id={id}></div>;
}
