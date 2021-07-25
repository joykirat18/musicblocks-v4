// -- types ----------------------------------------------------------------------------------------
import p5 from 'p5';
import { ITurtleModel } from '../../@types/artboard';

// -- model component definition -------------------------------------------------------------------

/**
 * Class representing the Model of the Menu component.
 */
class Turtle implements ITurtleModel {
    /** Stores the value for artBoard draw functions. */
    private _turtleX: number;
    private _turtleY: number;
    private _turtleAngle: number;
    private _turtleSteps: number;
    private _turtleDistance: number;
    private _angleToRotate: number;

    constructor() {
        this._turtleX = 500;
        this._turtleY = 500;
        this._turtleAngle = 0;
        this._turtleSteps = 5;
        this._turtleDistance = 400;
        this._angleToRotate = 30;
    }

    display(sketch: p5): void {
        sketch.rect(0, 0, 30, 60);
    }

    move(sketch: p5): void {
        sketch.translate(this._turtleX, this._turtleY);
        sketch.rotate(90 - this._turtleAngle);
    }

    render(sketch: p5): void {
        sketch.push();
        this.move(sketch);
        this.display(sketch);
        sketch.pop();
    }

    getTurtleX(): number {
        return this._turtleX;
    }
    setTurtleX(x: number): void {
        this._turtleX = x;
    }
    getTurtleY(): number {
        return this._turtleY;
    }
    setTurtleY(y: number): void {
        this._turtleY = y;
    }
    getTurtleAngle(): number {
        return this._turtleAngle;
    }
    setTurleAngle(angle: number): void {
        this._turtleAngle = angle;
    }
    getTurtleSteps(): number {
        return this._turtleSteps;
    }
    getTurleDistance(): number {
        return this._turtleDistance;
    }
    getAngleToRotate(): number {
        return this._angleToRotate;
    }
}
export const turtle1 = new Turtle();
export const turtle2 = new Turtle();
