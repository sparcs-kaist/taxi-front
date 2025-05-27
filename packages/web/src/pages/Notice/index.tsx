import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { useEffect, useState } from "react";
import "react-notion-x/src/styles.css";

import { useQuery } from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import ModalNoticeDetail from "@/components/ModalPopup/ModalNoticeDetail";
import NoticeItem from "@/components/Notice/NoticeItem";
import Title from "@/components/Title";
import { NoticeProps } from "@/pages/Home/NoticeSection";

const Notice = () => {
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
    <div style={{ paddingTop: "10px" }}>
      <HeaderWithBackButton>
        <Title>공지사항</Title>
      </HeaderWithBackButton>
      {!error && !isLoading && (
        <AdaptiveDiv type={"center"}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              whiteSpace: "pre-wrap",
              flexDirection: "column",
              paddingTop: "10px",
            }}
          >
            {noticeData.notices.map(
              (notice: NoticeProps, idx: number) =>
                notice.is_active && (
                  <NoticeItem
                    key={notice.title}
                    is_pinned={notice.is_pinned}
                    title={notice.title}
                    onClickHandler={() => {
                      openNotice(idx);
                    }}
                  />
                )
            )}
          </div>
          <ModalNoticeDetail
            isOpen={isOpen}
            onChangeIsOpen={setIsOpen}
            recordMap={recordMap}
            title={detailTitle}
          />
        </AdaptiveDiv>
      )}
      <Footer />
    </div>
  );
};

export default Notice;
