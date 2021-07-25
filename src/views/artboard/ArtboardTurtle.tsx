// -- types ----------------------------------------------------------------------------------------

import p5 from 'p5';
import { useEffect } from 'react';
import { turtle1, turtle2 } from '../../models/artboard/Turtle';
import { getViewportDimensions } from '../../utils/ambience';

// -- model component definition -------------------------------------------------------------------

/** This is a setup function.*/

const turtleSketch = (sketch: p5) => {
  sketch.setup = () => {
    const [width, height]: [number, number] = getViewportDimensions();
    sketch.createCanvas(width, height);
    sketch.rectMode(sketch.CENTER);
    sketch.clear();
    sketch.angleMode(sketch.DEGREES);
    turtle2.setTurtleX(800);
    turtle2.setTurtleY(400);
  };

  sketch.draw = () => {
    sketch.clear();

    turtle1.render(sketch);
    turtle2.render(sketch);
  };
};

/**
 * Class representing the Model of the Artboard component.
 */
export default function ArtboardSketch(props: { index: number }): JSX.Element {
  /** Stores the value of the auto hide state. */

  const id = `art-board-${props.index}`;
  useEffect(() => {
    new p5(turtleSketch, document.getElementById(id) as HTMLElement);
  }, []);

  return <div id={id} />;
}
