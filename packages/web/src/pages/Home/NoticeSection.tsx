import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { useEffect, useState } from "react";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";

const NoticeSection = () => {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap>();
  const notion = new NotionAPI({
    apiBaseUrl: "/notion",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await notion.getPage("1c111bc607c780e0a2dbfefdce25bdf7");
      setRecordMap(data);
    };

    fetchData();
  }, [notion]);

  return (
    <div>
      {recordMap && <NotionRenderer disableHeader recordMap={recordMap} />}
    </div>
  );
};

export default NoticeSection;
