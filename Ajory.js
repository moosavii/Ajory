import { useEffect, useRef } from "react";

export default function Ajory({ children, colWidth, colGap }) {
    const ref = useRef(null);

    const calcPosition = function () {

        let thisWidth = ref.current.offsetWidth;
        let renderedChildren = ref.current.childNodes;

        let colWidthGap = Math.trunc(colWidth) + Math.trunc(colGap);
        let colCount = Math.trunc(thisWidth / colWidthGap);
        let colEnd = new Array(colCount).fill(0);

        for (let index = 0; index < renderedChildren.length; index++) {
            renderedChildren[index].style.position = "absolute";

            let colIndex = (index % colCount);
            for (let j = 0; j < colCount; j++) {
                if (colEnd[j] < colEnd[colIndex])
                    colIndex = j;
            }


            renderedChildren[index].style.top = colEnd[colIndex] + "px";

            renderedChildren[index].style.right = (colIndex * colWidthGap) + "px";

            // most be at last line
            colEnd[colIndex] += renderedChildren[index].offsetHeight + Math.trunc(colGap);

        }

    }

    const resizeObserver = new ResizeObserver(calcPosition)

    useEffect(() => {
        calcPosition()
        resizeObserver.observe(ref.current)

    }, [])


    return (
        <div id="ajory" ref={ref} style={{ position: "relative" }}>
            {children}
        </div>
    );

} 