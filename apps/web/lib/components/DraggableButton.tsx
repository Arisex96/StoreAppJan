"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableButton = () => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: "drag-button",
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="border rounded-xl bg-blue-500 text-white px-4 py-2 cursor-grab active:cursor-grabbing"
    >
      Drag me
    </button>
  );
};

export default DraggableButton;
