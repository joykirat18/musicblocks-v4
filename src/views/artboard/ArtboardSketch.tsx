// -- types ----------------------------------------------------------------------------------------

import p5 from 'p5';
import { useEffect } from 'react';
import { getViewportDimensions } from '../../utils/ambience';

// -- model component definition -------------------------------------------------------------------
import ArtBoardDraw from '../../models/artboard/ArBoardDraw';
import { turtle1 } from '../../models/artboard/Turtle';
const artBoardDraw = new ArtBoardDraw();

/** This is a setup function.*/

const Sketch = (sketch: p5) => {
  // The three buttons to control the turtle
  let moveForwardButton: p5.Element;
  let rotateButton: p5.Element;
  let moveInArcButton: p5.Element;
  let moveExecuting = false;
  let arcExecuting = false;
  const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  function MakeQuerablePromise(promise: {
    isFulfilled: any;
    then: (arg0: (v: any) => any, arg1: (e: any) => never) => any;
  }) {
    // Don't modify any promise that has been already modified.
    if (promise.isFulfilled) return promise;

    // Set initial state
    let isPending = true;
    let isRejected = false;
    let isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    let result = promise.then(
      function (v: any) {
        isFulfilled = true;
        isPending = false;
        return v;
      },
      function (e: any) {
        isRejected = true;
        isPending = false;
        throw e;
      },
    );

    result.isFulfilled = function () {
      return isFulfilled;
    };
    result.isPending = function () {
      return isPending;
    };
    result.isRejected = function () {
      return isRejected;
    };
    return result;
  }
  /**
   * Called by moveForward iteravively to move the turtle forward step by step.
   * @param direction In which direction to draw the line
   */
  function moveForwardPart(i: number, direction: string) {
    const initialX = turtle1.getTurtleX();
    const initialY = turtle1.getTurtleY();

    if (direction === 'forward') {
      const finalX = initialX + turtle1.getTurtleSteps() * sketch.cos(turtle1.getTurtleAngle());
      const finalY = initialY - turtle1.getTurtleSteps() * sketch.sin(turtle1.getTurtleAngle());

      sketch.line(initialX, initialY, finalX, finalY);

      turtle1.setTurtleX(finalX);
      turtle1.setTurtleY(finalY);
    }
    if (direction === 'back') {
      const finalX = initialX - turtle1.getTurtleSteps() * sketch.cos(turtle1.getTurtleAngle());
      const finalY = initialY + turtle1.getTurtleSteps() * sketch.sin(turtle1.getTurtleAngle());

      sketch.line(initialX, initialY, finalX, finalY);

      turtle1.setTurtleX(finalX);
      turtle1.setTurtleY(finalY);
    }
  }
  /**
   * Called by moveForward iteravively to move the turtle forward step by step.
   * @param isNegative rotate the turtle in antiClockwise direction if isNegative is false
   * and vice versa
   */
  function rotateTurtlePart(isNegative: boolean) {
    const initialAngle = turtle1.getTurtleAngle();
    if (isNegative) {
      turtle1.setTurleAngle((initialAngle - 1) % 360);
    } else {
      turtle1.setTurleAngle((initialAngle + 1) % 360);
    }
  }
  /**
   * Rotates the turtle by the defined angle.
   * @param angle Angle by which the turtle should be rotated
   */
  async function rotateTurtle(angle: number) {
    let isNegative = false;
    if (angle < 0) {
      isNegative = true;
      angle = angle * -1;
    }

    for (let i = 0; i < angle; i++) {
      await sleep(10);
      rotateTurtlePart(isNegative);
    }
  }

  /**
   * Rotates the turtle by the defined steps and in forward and back direction.
   * @param direction The direction in which the turtle move ( forward or back)
   * @param steps Number of steps the turtle move
   */
  async function moveForward(steps: number, direction: string) {
    if (!moveExecuting) {
      moveExecuting = true;
      for (let i = 0; i < steps; i++) {
        await sleep(50);
        moveForwardPart(i, direction);
      }
    }
    moveExecuting = false;
  }

  /**
   * Function called in makeArc to arc the arc in n small steps
   * */
  function makeArcSteps(i: number, radius: number) {
    let initialX = turtle1.getTurtleX();
    let initialY = turtle1.getTurtleY();

    let finalX = initialX + radius * sketch.cos(turtle1.getTurtleAngle() + 1);
    let finalY = initialY - radius * sketch.sin(turtle1.getTurtleAngle() + 1);

    sketch.line(initialX, initialY, finalX, finalY);

    turtle1.setTurtleX(finalX);
    turtle1.setTurtleY(finalY);

    turtle1.setTurleAngle(turtle1.getTurtleAngle() + 1);
  }

  /**
   *
   * @param radius Radius for the arc
   * @param angle The angle of the arc
   */
  async function makeArc(angle: number, radius: number) {
    for (let i = 0; i < angle; i++) {
      await sleep(50);
      makeArcSteps(i, radius);
    }
  }

  function rotate() {
    rotateTurtle(turtle1.getAngleToRotate());
  }
  function move() {
    moveForward(turtle1.getTurleDistance() / turtle1.getTurtleSteps(), 'forward');
  }
  function moveInArc() {
    makeArc(90, 5);
  }

  sketch.setup = () => {
    const [width, height]: [number, number] = getViewportDimensions();
    sketch.createCanvas(width, height);
    sketch.clear();
    moveForwardButton = sketch.createButton('Move');
    moveForwardButton.mousePressed(move);
    moveForwardButton.position(300, 0);
    rotateButton = sketch.createButton('Rotate');
    rotateButton.mousePressed(rotate);
    rotateButton.position(300, 30);
    moveInArcButton = sketch.createButton('Arc');
    moveInArcButton.mousePressed(moveInArc);
    moveInArcButton.position(400, 30);
    sketch.angleMode(sketch.DEGREES);
  };

  sketch.draw = () => {
    const [width, height]: [number, number] = getViewportDimensions();
    sketch.stroke(artBoardDraw.getStokeColor());
    sketch.strokeWeight(artBoardDraw.getStrokeWeight());
    if (turtle1.getTurtleX() > width) {
      turtle1.setTurtleX(0);
    }
    if (turtle1.getTurtleX() < 0) {
      turtle1.setTurtleX(width);
    }
    if (turtle1.getTurtleY() > height) {
      turtle1.setTurtleY(0);
    }
    if (turtle1.getTurtleY() < 0) {
      turtle1.setTurtleY(height);
    }
  };
};

/**
 * Class representing the Model of the Artboard component.
 */
export default function ArtboardSketch(props: { index: number }): JSX.Element {
  /** Stores the value of the auto hide state. */

  const id = `art-board-${props.index}`;
  useEffect(() => {
    new p5(Sketch, document.getElementById(id) as HTMLElement);
  }, []);

  return <div id={id} />;
}
