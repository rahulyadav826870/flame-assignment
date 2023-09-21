import { useEffect, useState } from "react";
import "./BottomSheet.css";

const BottomSheet = () => {
  const [classChange, setClassChange] = useState(false);
  const [height, setHeight] = useState(10);
  const [positionMove, setPositionMove] = useState(undefined);
  const [displayMessage,setDisplayMessage] =useState("Hello")

  const positionMoveStart = (event) => {
    let y = atPosition(event).pageY;
    setPositionMove(y);
    setClassChange(true);
    document.body.style.cursor = "grabbing";
  };

  const positionMoveEnd = () => {
    setPositionMove(undefined);
    setClassChange(false);
    document.body.style.cursor = "";
    if (height < 25) {
      setHeight(10);
      setDisplayMessage("Hello")
    } else if (height > 75) {
      setHeight(100);
      setDisplayMessage("I AM A Full-Stack Developer")
    } else {
      setHeight(50);
      setDisplayMessage("My Name Is Rahul Yadav")
    }
  };

  const positionMoving = (event, hi) => {
    if (positionMove === undefined) return;
    const y = atPosition(event).pageY;
    const deltaY = positionMove - y;
    setPositionMove(y);
    const deltaHeight = (deltaY / window.innerHeight) * 100;
    setHeight(height + deltaHeight);
  };

  

  function atPosition(e) {
    return e.touches ? e.touches[0] : e;
  }

  const handleEscape = (event) => {
    if (event.key === "Escape" && height != 10) {
      setHeight(10);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleEscape);
    window.addEventListener("mousemove", positionMoving);
    window.addEventListener("touchmove", positionMoving);
    window.addEventListener("mouseup", positionMoveEnd);
    window.addEventListener("touchend", positionMoveEnd);

    return () => {
      window.removeEventListener("keyup", handleEscape);
      window.removeEventListener("mousemove", positionMoving);
      window.removeEventListener("touchmove", positionMoving);
      window.removeEventListener("mouseup", positionMoveEnd);
      window.removeEventListener("touchend", positionMoveEnd);
    };
  }, [classChange, positionMove]);

  return (
    <div className="mainContainer">
      <div  className="childContainer" role="dialog">
        <div className="homePage" onClick={() => setHeight(10)}></div>
        <div
          style={{ height: `${height}vh` }}
          className={
            height == 100
              ? classChange
                ? "contents fullscreen notSelectable"
                : "contents fullscreen"
              : classChange
              ? "contents notSelectable"
              : "contents"
          }
        >
          <header className="controls"> 
            <div
              className="dragArea"
              onMouseDown={positionMoveStart}
              onTouchStart={positionMoveStart}
              style={{ cursor: `${classChange ? "grabbing" : ""}` }}
            >
              <div className="dragThumb"></div>
            </div>
            {height > 25 && (
              <button
                className="closeContainer"
                title="Close"
                onClick={() => setHeight(10)}
              >
                X
              </button>
            )}
          </header>

          <p className="displayMessage">{displayMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
