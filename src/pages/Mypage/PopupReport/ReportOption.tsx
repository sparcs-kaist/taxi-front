import { useTranslation } from "react-i18next";
import theme from "tools/theme";

export type ReportOptionType = "Reporting" | "Reported";

type ReportOptionProps = {
  option: ReportOptionType;
  onClick: (option: ReportOptionType) => void;
};

const ReportOption = (props: ReportOptionProps) => {
  const { t } = useTranslation("mypage");
  const styleContainer = {
    display: "flex",
    columnGap: "8px",
    padding: "10px 0 12px 8px",
  };
  const styleButton = (isSelected: boolean) => {
    return {
      display: "flex",
      ...theme.font10,
      borderRadius: "4px",
      padding: "3px 6px 3px",
      ...theme.cursor(),
      color: isSelected ? theme.white : theme.gray_text,
      backgroundColor: isSelected ? theme.purple : theme.gray_background,
      boxShadow: isSelected
        ? theme.shadow_purple_button_inset
        : theme.shadow_gray_input_inset,
    };
  };
  return (
    <div style={styleContainer}>
      <div
        style={styleButton(props.option === "Reporting")}
        onClick={() => props.onClick("Reporting")}
      >
        {t("page_report.reported")}
      </div>
      <div
        style={styleButton(props.option === "Reported")}
        onClick={() => props.onClick("Reported")}
      >
        {t("page_report.received")}
      </div>
    </div>
  );
};

export default ReportOption;
