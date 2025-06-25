import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { useEffect, useState } from "react";
import "react-notion-x/src/styles.css";
import { Link } from "react-router-dom";

import { useQuery } from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import ModalNoticeDetail from "@/components/ModalPopup/ModalNoticeDetail";
import NoticeItem from "@/components/Notice/NoticeItem";
import Title from "@/components/Title";

export type NoticeProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  is_active: boolean;
  is_pinned: boolean;
  notion_url: string;
  title: string;
};

const NoticeSection = () => {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap>();
  const [detailTitle, setDetailTitle] = useState("");
  const notion = new NotionAPI({ apiBaseUrl: "/notion" });
  const [error, noticeData, isLoading] = useQuery.get(`/notice/list`);
  const [noticeIndex, setNoticeIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openNotice = async (idx: number) => {
    if (!noticeData?.notices[idx]) return;
    setNoticeIndex(idx);
    setRecordMap(undefined);
    setDetailTitle("");
    try {
      const pageId = noticeData.notices[idx].notion_url;
      const data = await notion.getPage(pageId);
      setDetailTitle(noticeData.notices[idx].title);
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
  }, [noticeData, noticeIndex]);

  return (
    !error &&
    !isLoading && (
      <AdaptiveDiv type="center">
        <Link to="/notice" css={{ textDecoration: "none" }}>
          <Title icon="notice" isHeader>
            공지사항
          </Title>
        </Link>

        <div
          style={{
            display: "flex",
            gap: "8px",
            whiteSpace: "pre-wrap",
            flexDirection: "column",
          }}
        >
          {noticeData.notices.map(
            (notice: NoticeProps, idx: number) =>
              notice.is_active &&
              notice.is_pinned && (
                <NoticeItem
                  key={notice.id}
                  is_pinned={notice.is_pinned}
                  title={notice.title}
                  onClickHandler={() => {
                    openNotice(idx);
                  }}
                />
              )
          )}
          {noticeData.notices.filter(
            (notice: NoticeProps) => notice.is_active && notice.is_pinned
          ).length === 0 && <div>공지사항이 없습니다.</div>}
        </div>
        <ModalNoticeDetail
          isOpen={isOpen}
          onChangeIsOpen={setIsOpen}
          recordMap={recordMap}
          title={detailTitle}
        />
      </AdaptiveDiv>
    )
  );
};

export default NoticeSection;
