import React, { useMemo, useState, useRef, useCallback } from "react";
import styles from "./index.module.css";

//  每行多少列
const COLUMN = 4;
//  每个元素宽度
const WIDTH = 120;
//  每个元素高度
const HEIGHT = 80;
// 图片左右 padding
const IMAGE_PADDING = 5;

const showList = [
  {
    id: 2,
    name: "osmo pocket",
    image:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605703865983&di=a35a43a3b9e866f1ee0048563bfd2577&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F5d8f2523322e3f4de91021701e95182c.jpeg",
  },
  {
    id: 4,
    name: "mavic pro",
    image:
      "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=787082346,3090178555&fm=15&gp=0.jpg",
  },
  {
    id: 1,
    name: "mavic mini2",
    image:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605703111703&di=59fa621eb1e7f8f4285b95df80e11fd0&imgtype=0&src=http%3A%2F%2Fp1.itc.cn%2Fimages01%2F20201105%2F600892c32d524b99a118ea56cdf3c211.png",
  },
  {
    id: 3,
    name: "机甲大师s1",
    image:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605703133913&di=a415583ce97dd0a34efe17cac24a97ab&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20200325%2F64ebb68f1125450f91e64bb34dc19d55.jpeg",
  },
  {
    id: 0,
    name: "mavic 2",
    image:
      "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4132295553,3011440949&fm=26&gp=0.jpg",
  },
];

export function insertBefore(list, from, to) {
  const copy = [...list];
  const fromIndex = copy.indexOf(from);
  if (from === to) {
    return copy;
  }
  copy.splice(fromIndex, 1);
  const newToIndex = to ? copy.indexOf(to) : -1;
  if (to && newToIndex >= 0) {
    copy.splice(newToIndex, 0, from);
  } else {
    copy.push(from);
  }
  return copy;
}

export function isEqualBy(a, b, key) {
  const aList = a.map((item) => item[key]);
  const bList = b.map((item) => item[key]);

  let flag = true;
  aList.forEach((i, idx) => {
    if (i !== bList[idx]) {
      flag = false;
    }
  });
  return flag;
}

const DragAndDropPage = () => {
  const [list, setList] = useState(showList);
  const dragItemRef = useRef();
  const dropAreaRef = useRef(null);

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
    <div
      className={styles.wrapper}
      ref={dropAreaRef}
      style={{ width: COLUMN * (WIDTH + IMAGE_PADDING) + IMAGE_PADDING }}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <ul className={styles.list} style={{ height: listHeight }}>
        {sortedList.map((item) => {
          const index = list.findIndex((i) => i === item);
          const row = Math.floor(index / COLUMN);
          const col = index % COLUMN;
          return (
            <li
              draggable
              key={item.id}
              className={styles.item}
              style={{
                height: HEIGHT,
                left: col * (WIDTH + IMAGE_PADDING),
                top: row * HEIGHT,
                padding: `0 ${IMAGE_PADDING}px`,
              }}
              data-id={item.id}
              onDragStart={(e) => handleDragStart(e, item)}
            >
              <img src="/img.jpg" alt={item.name} width={WIDTH} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(DragAndDropPage);
