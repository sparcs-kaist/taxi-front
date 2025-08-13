// 방 목록 정렬 유틸리티 함수
export const sortRoomsByUnreadCount = (rooms: Array<any>) => {
  return [...rooms].sort((a, b) => {
    // 1. unreadCount가 있는 방들을 최상단으로
    const aHasUnread = (a.unreadCount || 0) > 0;
    const bHasUnread = (b.unreadCount || 0) > 0;

    if (aHasUnread && !bHasUnread) return -1;
    if (!aHasUnread && bHasUnread) return 1;

    // 2. 둘 다 unreadCount가 있는 경우, 더 최근에 메시지가 온 방을 위로
    // (unreadCount가 많다는 것은 더 많은 새 메시지가 있다는 의미이므로 최근 활동이 더 많음)
    if (aHasUnread && bHasUnread) {
      // unreadCount가 높은 순으로 정렬 (더 많은 안읽은 메시지 = 더 활발한 채팅)
      const unreadDiff = (b.unreadCount || 0) - (a.unreadCount || 0);
      if (unreadDiff !== 0) return unreadDiff;

      // unreadCount가 같으면 방 생성시간 기준 최신 순
      return (
        new Date(b.madeat || b.time).getTime() -
        new Date(a.madeat || a.time).getTime()
      );
    }

    // 3. 둘 다 unreadCount가 0인 경우, 방 생성시간 기준 최신 순
    return (
      new Date(b.madeat || b.time).getTime() -
      new Date(a.madeat || a.time).getTime()
    );
  });
};
