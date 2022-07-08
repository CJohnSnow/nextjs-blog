import React, {
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import styles from "./style.module.css";

//  每行多少列
const COLUMN = 4;
//  每个元素宽度
const WIDTH = 120;
//  每个元素高度
const HEIGHT = 80;
// 图片左右 padding
const IMAGE_PADDING = 5;

function spArr(arr, num) {
  let newArr = [];
  for (let i = 0; i < arr.length; ) {
    newArr.push(arr.slice(i, (i += num)));
  }
  return newArr;
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(1200);

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize(window.innerWidth < 1000 ? 860 : 1200);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

const SwipeContainer = () => {
  const [checkedIndex, setCheckedIndex] = useState(0);
  const [list, setList] = useState(
    new Array(66).fill(null).map((item, index) => ({
      id: index,
      name: `APP${index}`,
      image:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605703865983&di=a35a43a3b9e866f1ee0048563bfd2577&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F5d8f2523322e3f4de91021701e95182c.jpeg",
    }))
  );
  const dragItemRef = useRef();
  const dropAreaRef = useRef(null);
  const size = Number(useWindowSize());

  // 拖拽方法实现
  const sortedList = useMemo(() => {
    return list.slice().sort((a, b) => {
      return a.id - b.id;
    });
  }, [list]);

  const listHeight = useMemo(() => {
    const size = list.length;
    return Math.ceil(size / COLUMN) * HEIGHT;
  }, [list]);

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
    console.log(dropAreaRef)
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
    <div className={styles.content}>
      <div className={styles.swipe}>
        {new Array(3).fill(1).map((_, i) => (
          <React.Fragment key={i}>
            <input
              type="radio"
              name="indicator"
              id={`indicator${i}`}
              onClick={() => setCheckedIndex(i)}
            />
            <label
              style={{
                backgroundColor: checkedIndex === i && "#fff",
              }}
              htmlFor={`indicator${i}`}
            />
          </React.Fragment>
        ))}
        <ul
          style={{
            marginLeft: `-${checkedIndex * size}px`,
          }}
        >
          {spArr(list, 30).map((d, i) => (
            <li
              key={i}
              ref={dropAreaRef}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              style={{
                gridTemplateColumns: `repeat(${size === 1200 ? 6 : 5}, 80px)`,
                gridRowGap: "20px",
                gridColumnGap: "20px",
              }}
            >
              {d.map((_, index) => (
                <div
                  draggable
                  data-id={index}
                  onDragStart={(e) => handleDragStart(e, _)}
                  key={String(index + 1)}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "72px",
                    backgroundColor: "whitesmoke",
                    color: "GrayText",
                    fontWeight: "600",
                    borderRadius: "12px",
                  }}
                >
                  {_.name}
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SwipeContainer;
