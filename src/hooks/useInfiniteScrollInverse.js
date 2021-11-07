import { useState, useEffect } from "react";
import axios from "axios";
import { backServer } from "../serverconf";

const chatServerAddr = `${backServer}/chats`

// interface chatRes {
//   data: chat[],
//   page: number,
//   totalPage: number,
//   totalChats: number
// }

const fetchData = (roomId, page, pageSize) => {
  console.log("fetchData()")
  return axios.get(chatServerAddr + '/' + roomId, {
    params: {
      page: page,
      pageSize: pageSize
    }
  })
}

const useInfiniteScrollInverse = (roomId, scrollLength) => {
  console.log("useInfiniteScrollInverse rendered")
  const [items, setItems] = useState({ data: [], isNewChat: false });
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // next() 를 통해 page가 바뀔 때마다 채팅을 새로 로딩하여 기존 데이터에 추가
  useEffect(() => {
    console.log("useEfffect of page")
    // 초기값 가져오기
    fetchData(roomId, page, scrollLength)
      .then((res) => {
        const data = res.data;
        console.log("fetch res: " + data);
        // 로딩 메시지 테스트를 위해 일부러 setTimeout
        setTimeout(() => {
          setItems(prev => {
            return {
              data: [...data.data, ...prev.data],
              isInitialLoad: page === 0,
              isNewChat: false
            }
          })
        }, 1000)

        setHasNext(page + 1 <= data.totalPage)
        console.log("fetch done")
      })
  }, [page])

  // page++ 하기
  const next = () => {
    if (hasNext) {
      setIsFetching(true);
      setPage(page + 1);
    }
    else console.error("noMoreItems")
  }

  // 새로운 채팅을 등록
  const newChat = (newChat) => {
    setItems(prev => {
      return {
        data: [...prev.data, newChat],
        isNewChat: true
      }
    });
  }

  return { items, hasNext, next, newChat, isFetching, setIsFetching }
}

export default useInfiniteScrollInverse;