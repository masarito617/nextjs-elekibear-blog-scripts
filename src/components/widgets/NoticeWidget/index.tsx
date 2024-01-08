import { css, Theme } from '@emotion/react';
import SideWidgetBase from '../WidgetBase';
import WidgetSettings from 'settings/WidgetSettings';

const styleRoot = (theme: Theme) => css`
  padding: 12px;
  color: ${theme.colors.primaryLightGray};
`;

/**
 * お知らせウィジェット
 * @returns
 */
const NoticeWidget = () => {
  const noticeContent = WidgetSettings.NoticeContent;
  if (!noticeContent) {
    return <></>;
  }

  return (
    <SideWidgetBase title="お知らせ">
      <div css={styleRoot}>
        <div dangerouslySetInnerHTML={{ __html: noticeContent }} />
      </div>
    </SideWidgetBase>
  );
};
export default NoticeWidget;
