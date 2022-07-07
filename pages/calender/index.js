import React, { useMemo, useState, useRef, useCallback } from "react";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import styles from "./style.module.css";

function spArr(arr, num) {
  let newArr = [];
  for (let i = 0; i < arr.length; ) {
    newArr.push(arr.slice(i, (i += num)));
  }
  return newArr;
}

const CalendarContainer = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [list, setList] = useState(new Array(66).fill(null));
  const dragItemRef = useRef();
  const dropAreaRef = useRef(null);

  // 拖拽方法实现
  // const sortedList = useMemo(() => {
  //   return list.slice().sort((a, b) => {
  //     return a.id - b.id;
  //   });
  // }, [list]);

  // const listHeight = useMemo(() => {
  //   const size = list.length;
  //   return Math.ceil(size / COLUMN) * HEIGHT;
  // }, [list]);

  const updateList = useCallback(
    (clientX, clientY) => {
      const dropRect = dropAreaRef.current.getBoundingClientRect();
      if (dropRect) {
        const offsetX = clientX - dropRect.left;
        const offsetY = clientY - dropRect.top;
        const dragItem = dragItemRef.current;
        // 超出拖动区域
        if (
          !dragItem ||
          offsetX < 0 ||
          offsetX > dropRect.width ||
          offsetY < 0 ||
          offsetY > dropRect.height
        ) {
          return;
        }

        const col = Math.floor(offsetX / WIDTH);
        const row = Math.floor(offsetY / HEIGHT);
        let currentIndex = row * COLUMN + col;
        const fromIndex = list.indexOf(dragItem);
        if (fromIndex < currentIndex) {
          // 从前往后移动
          currentIndex++;
        }
        const currentItem = list[currentIndex];

        const ordered = insertBefore(list, dragItem, currentItem);
        if (isEqualBy(ordered, list, "id")) {
          return;
        }
        setList(ordered);
      }
    },
    [list]
  );

  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      updateList(e.clientX, e.clientY);
    },
    [updateList]
  );

  const handleDragStart = (e, data) => {
    dragItemRef.current = data;
    const el = dropAreaRef.current.querySelector(`[data-id="${data.id}"]`);
    if (el) {
      el.classList.add(styles.draggingItem);
    }
  };

  const handleDragEnd = useCallback(() => {
    const data = dragItemRef.current;
    if (data) {
      const el = dropAreaRef.current.querySelector(`[data-id="${data.id}"]`);
      if (el) {
        el.classList.remove(styles.draggingItem);
      }
      dragItemRef.current = undefined;
    }
  }, []);

  return (
    <div className={styles.app}>
      <CaretLeftFilled
        onClick={() => pageIndex > 0 && setPageIndex((value) => value - 1)}
      />
      <div
        style={{
          width: "1360px",
          display: "flex",
          transform: `translate(-${(pageIndex - 1) * 1260}px, 0)`,
        }}
      >
        {spArr(list, 30).map((d, i) => (
          <div
            className={styles.app__content}
            ref={dropAreaRef}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            key={String(i + 1)}
          >
            {d.map((_, index) => (
              <div
                draggable
                data-id={index}
                onDragStart={(e) => handleDragStart(e, _)}
                key={String(index + 1)}
                className={styles.app__content__item}
              >{`content ${index + 1}`}</div>
            ))}
          </div>
        ))}
      </div>
      <CaretRightFilled
        onClick={() => pageIndex < 3 && setPageIndex((value) => value + 1)}
      />
    </div>
  );
};

export default CalendarContainer;
