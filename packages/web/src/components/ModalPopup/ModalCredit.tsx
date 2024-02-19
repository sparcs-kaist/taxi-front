import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Members } from "@/types/members";

import Modal from "@/components/Modal";
import Navigation from "@/components/Navigation";

import theme from "@/tools/theme";

import { ReactComponent as SparcsLogoBlack } from "@/static/assets/sparcsLogos/SparcsLogoBlack.svg";
import { ReactComponent as SparcsLogoYellow } from "@/static/assets/sparcsLogos/SparcsLogoYellow.svg";
import {
  members,
  members2023FallEvent,
  members2023SpringEvent,
  members2024SpringEvent,
} from "@/static/members";

type MemberProps = Members[number]["list"][number];

const Member = ({ name, id, period }: MemberProps) => (
  <div
    css={{
      background: theme.purple_light,
      borderRadius: "10px",
      padding: "16px 12px 12px",
      boxShadow: theme.shadow,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      css={{
        display: "flex",
        alignItems: "center",
        marginBottom: "8px",
      }}
    >
      <div
        css={{
          ...theme.font14_bold,
          whiteSpace: "nowrap" as const,
        }}
      >
        {name}
      </div>
      <SparcsLogoYellow
        style={{
          height: "18px",
          paddingLeft: "8px",
          paddingRight: "4px",
        }}
      />
      <div
        css={{
          ...theme.font12,
          color: theme.yellow,
          fontWeight: "bold",
        }}
      >
        {id}
      </div>
    </div>
    <div
      css={{
        ...theme.font10_bold,
        color: theme.gray_text,
      }}
    >
      {period}
    </div>
  </div>
);

type BodyMembersProps = { values: Members };

const BodyMembers = ({ values }: BodyMembersProps) => (
  <div
    css={{
      overflow: "auto",
      paddingTop: "12px",
      minHeight: "270px",
      height: "calc(100vh - 360px)",
      maskImage:
        "linear-gradient(to bottom, transparent, white 16px, white calc(100% - 16px), transparent 100%)",
    }}
  >
    {values.map(({ position, list }) => (
      <div key={position}>
        <div
          css={{
            ...theme.font14_bold,
            padding: "0 0 12px 12px",
          }}
        >
          {position}
        </div>
        <div
          css={{
            display: "flex",
            flexWrap: "wrap" as const,
            gap: "12px",
            paddingBottom: "12px",
          }}
        >
          {list.map((member) => (
            <Member key={member.id} {...member} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

type ModalCreditProps = {
  defaultSelectedCatagory?: string;
} & Parameters<typeof Modal>[0];

const ModalCredit = ({
  defaultSelectedCatagory,
  ...modalProps
}: ModalCreditProps) => {
  const { t } = useTranslation("mypage");
  const pages = useMemo(
    () => [
      {
        key: "all",
        name: t("page_credit.category_all"),
        body: <BodyMembers values={members} />,
      },
      {
        key: "2024SpringEvent",
        name: t("page_credit.category_2024spring_event"),
        body: <BodyMembers values={members2024SpringEvent} />,
      },
      {
        key: "2023FallEvent",
        name: t("page_credit.category_2023fall_event"),
        body: <BodyMembers values={members2023FallEvent} />,
      },
      {
        key: "2023SpringEvent",
        name: t("page_credit.category_2023spring_event"),
        body: <BodyMembers values={members2023SpringEvent} />,
      },
      {
        key: "2024SpringEvent",
        name: t("page_credit.category_2024spring_event"),
        body: <BodyMembers values={members2024SpringEvent} />,
      },
    ],
    [t]
  );

  return (
    <Modal
      width={theme.modal_width_large}
      css={{ padding: "16px 12px 12px" }}
      {...modalProps}
    >
      <div
        css={{
          ...theme.font18,
          display: "flex",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <SparcsLogoBlack
          style={{
            height: "21px",
            width: "auto",
            margin: "0 8px",
          }}
        />
        {t("credit")}
      </div>
      <Navigation
        defaultSelectedKey={defaultSelectedCatagory}
        pages={pages}
        isDisplayDottedLine
      />
    </Modal>
  );
};

export default memo(ModalCredit);
