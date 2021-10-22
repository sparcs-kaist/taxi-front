import { useState, useEffect } from "react";
import axios from "axios";

const chatServerAddr = 'http://ec2-18-116-38-81.us-east-2.compute.amazonaws.com/:9000/chats'

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

  useEffect(() => {
    console.log("useEfffect of page")

    fetchData(roomId, page, scrollLength)
      .then((res) => {
        const data = res.data;
        console.log(data);
        // 로딩 메시지 테스트를 위해 일부러 setTimeout
        setTimeout(() => {
          setItems(prev => {
            return {
              data: [...data.data, ...prev.data],
              isNewChat: false
            }
          })
        }, 1000)

        setHasNext(page + 1 <= data.totalPage)
        console.log("fetch done")
      })
  }, [page])

  const next = () => {
    console.log('next()')
    console.log('hasNext ' + hasNext)
    if (hasNext) {
      setIsFetching(true);
      setPage(page + 1);
    }
    else console.error("noMoreItems")
  }

  const newChat = (newChat) => {
    console.log("newChat()");
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