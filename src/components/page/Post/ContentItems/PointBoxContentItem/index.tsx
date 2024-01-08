/**
 * ポイント欄
 * @param props
 * @returns
 */
const PointBoxContentItem = (props: {
  children: React.ReactNode;
  title: string;
}) => {
  if (typeof props.children !== 'string') {
    console.log('TalkComponent contains an invalid element!!');
    return;
  }

  return (
    <div className="roundbox">
      <div className="boxtitle">{props.title}</div>
      <div dangerouslySetInnerHTML={{ __html: props.children }}></div>
    </div>
  );
};
export default PointBoxContentItem;
