import { useEffect } from 'react';
// -- types ----------------------------------------------------------------------------------------

import { IArtboardProps } from '../../@types/artboard';

// -- stylesheet -----------------------------------------------------------------------------------

import './Artboard.scss';

// -- view component definition --------------------------------------------------------------------
import ArtboardSketch from './ArtboardSketch';
import ArtboardSketch1 from './ArtboardSketch1';
import ArtboardTurtle from './ArtboardTurtle';
/**
 * View of the Artboard Framework component.
 *
 * @returns root JSX element
 */
export default function (props: IArtboardProps): JSX.Element {
  useEffect(() => {
    window.addEventListener('resize', props.updateDimensions);
    return () => window.removeEventListener('resize', props.updateDimensions);
  }, []);
  return (
    <>
      <div id="artboard-wrapper">
        <h4>Artboard {`(${props.dimensions[0]} × ${props.dimensions[1]})`}</h4>
        <ArtboardSketch index={props.id} />
        <ArtboardSketch1 index={props.id + 1} />
        <ArtboardTurtle index={props.id + 2} />
      </div>
    </>
  );
}
