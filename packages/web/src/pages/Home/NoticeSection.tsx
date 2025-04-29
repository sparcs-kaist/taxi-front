import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { useEffect, useState } from "react";
import "react-notion-x/src/styles.css";

import { useQuery } from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import ModalNoticeDetail from "@/components/ModalPopup/ModalNoticeDetail";
import NoticeItem from "@/components/Notice/NoticeItem";
import Title from "@/components/Title";

type NoticeProps = {
  createdAt: Date;
  updatedAt: Date;
  is_active: boolean;
  is_pinned: boolean;
  notion_url: string;
  title: string;
};

const NoticeSection = () => {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap>();
  const notion = new NotionAPI();
  const [error, noticeData, isLoading] = useQuery.get(`/notice/list`);
  const [noticeIndex, setNoticeIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openNotice = async (idx: number) => {
    if (!noticeData?.notices[idx]) return;
    setNoticeIndex(idx);
    setRecordMap(undefined); // 로딩 상태 표시
    try {
      const pageId = noticeData.notices[idx].notion_url;
      const data = await notion.getPage(pageId);
      setRecordMap(data);
      setIsOpen(true);
    } catch (err) {
      console.error("Failed to fetch Notion page:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!noticeData || noticeData.notices.length === 0) return;

      const pageId = noticeData.notices[noticeIndex].notion_url;
      try {
        const data = await notion.getPage(pageId as string);
        setRecordMap(data);
      } catch (err) {
        console.error("Failed to fetch Notion page:", err);
      }
    };

    fetchData();
    console.log(noticeData);
  }, [noticeData, noticeIndex]);

  return (
    !error &&
    !isLoading && (
      <AdaptiveDiv type="center" style={{ marginTop: "15px" }}>
        <Title icon="notice" isHeader>
          공지사항
        </Title>
        <div
          style={{
            display: "flex",
            gap: "8px",
            whiteSpace: "pre-wrap",
            flexDirection: "column",
          }}
        >
          {noticeData.notices.map((notice: NoticeProps, idx: number) => (
            <NoticeItem
              key={notice.title}
              is_active={notice.is_active}
              is_pinned={notice.is_pinned}
              title={notice.title}
              onClickHandler={() => {
                openNotice(idx);
              }}
            />
          ))}
        </div>
        <ModalNoticeDetail
          isOpen={isOpen}
          onChangeIsOpen={setIsOpen}
          recordMap={recordMap}
        />
      </AdaptiveDiv>
    )
  );
};

export default NoticeSection;
