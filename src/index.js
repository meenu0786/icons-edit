import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { IconPicker } from "react-fa-icon-picker";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function App() {
  const [arrObj, setArrObj] = React.useState([
    { id: "1", icon: "FaAccessibleIcon", value: "This is a accessible" },
    { id: "2", icon: "FaApple", value: "This is a Apple" },
    { id: "3", icon: "FaCircle", value: "This is a Circle" },
  ]);

  const handleIcon = (v, index) => {
    arrObj[index]["icon"] = v;
    setArrObj([...arrObj]);
  };
  const handleDropEnd = (param) => {
    const src = param.source?.index;
    const dest = param.destination?.index;

    arrObj.splice(dest, 0, arrObj.splice(src, 1)[0]);
    setArrObj([...arrObj]);
  };
  const handleChange = (e, index) => {
    arrObj[index]["value"] = e.target.value;
    setArrObj([...arrObj]);
  };
  const handleIconChange = (v) => {
    const item = {};
    item.id = (arrObj.length + 1).toString();
    item.icon = v;
    item.value = `This is a ${v}`;
    setArrObj([...arrObj, item]);
  };
  const printSlide = () => {
    const div = document.getElementById('editable-slide');
    console.log(div);
    html2canvas(div)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save('new.pdf');
    });
  };
  return (
    <div className="container">
      <div className="topmaincontainer" id="editable-slide">
      <div className="top-header">
      <input className="heading" placeholder="Insert the Title here"/>
      <IconPicker
        value="FaPlusCircle"
        onChange={(v) => {
          handleIconChange(v);
        }}
      />
      </div>
      <div className="box-middle">
      <DragDropContext  onDragEnd={handleDropEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {arrObj.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="iconborder"
                    >
                      <IconPicker
                        value={item.icon}
                        onChange={(v) => handleIcon(v, index)}
                      />
                      <input
                        className="iconTitle"
                        onChange={(e) => handleChange(e, index)}
                        value={item.value}
                      />    
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
      </div>
      <button onClick={printSlide}>Export as pdf</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

