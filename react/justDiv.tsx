import React, { useEffect, useState } from 'react'

import { useCssHandles } from 'vtex.css-handles'

interface justDivProps {
  blockClass?: string,
  htmlId?: string,
  minPosition?: number

}

const CSS_HANDLES = [
  'justDiv'
] as const;

const justDiv: StorefrontFunctionComponent<justDivProps> = (
  { 
    children,
    blockClass="",
    htmlId,
    minPosition=0
  }
  
) => {

  let lastPosition = 0;

  const [scrollDirection, setScrollDirection] = useState("none");

  const handleScroll = () => {
    const actualPosition = window.pageYOffset;
    let direction = "none";
    if(actualPosition < minPosition) {
      direction = "none";
    } else if(lastPosition < actualPosition) {
      direction = "down";
    } else if(lastPosition > actualPosition) {
      direction = "up";
    }
    lastPosition = actualPosition;
    setScrollDirection(direction);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { handles } = useCssHandles(CSS_HANDLES, blockClass);
  return (<div
    className={handles.justDiv +
                (scrollDirection === "up" ? "--scrollUp" : "") +
                (scrollDirection === "down" ? "--scrollDown" : "")
              }
    style={scrollDirection === "up" || scrollDirection === "down" ? {position: "fixed"} : {width: "100%"}}
    id={htmlId}>
            {children}
          </div>)
}


//Stuff for the site editor. Might not need it.
justDiv.schema = {
  title: 'editor.field.title',
  description: 'editor.field.description',
  type: 'object', 
}

export default justDiv
