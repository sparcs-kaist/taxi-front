// 안전한 타임스탬프 변환 (없거나 invalid하면 -Infinity 로)
const toTs = (v: any) => {
  const t = v ? new Date(v).getTime() : NaN;
  return Number.isFinite(t) ? t : -Infinity;
};

// 최신이 위로(내림차순), unread 우선, 동률일 때 madeAt 내림차순
export const sortRoomsByUnreadCount = (rooms: Array<any> = []) => {
  return [...rooms].sort((a, b) => {
    const aImportant = (a.hasImportantMessage || 0) > 0;
    const bImportant = (b.hasImportantMessage || 0) > 0;

    if (aImportant !== bImportant) return aImportant ? -1 : 1;

    const aUnread = (a.unreadCount || 0) > 0;
    const bUnread = (b.unreadCount || 0) > 0;

    // 1) unread 우선
    if (aUnread !== bUnread) return aUnread ? -1 : 1;

    // 2) 최근 활동 시간(time) 내림차순
    const at = toTs(a.time);
    const bt = toTs(b.time);
    if (bt !== at) return bt - at; // desc

    // 3) 동률이면 madeAt 내림차순
    const ama = toTs(a.madeAt);
    const bma = toTs(b.madeAt);
    if (bma !== ama) return bma - ama; // desc

    // 4) 그래도 같으면 _id 로 안정적 정렬 (옵션)
    return String(b._id ?? b.id ?? "").localeCompare(
      String(a._id ?? a.id ?? "")
    );
  });
};
