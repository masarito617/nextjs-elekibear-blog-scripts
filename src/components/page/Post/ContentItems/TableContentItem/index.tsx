import { css } from '@emotion/react';

const styleTableTitle = css`
  margin: 0px;
  margin-left: 2px;
  margin-bottom: 4px;
  font-weight: bold;
`;

/**
 * カスタムテーブルコンポーネント
 * 通常のテーブル指定だとカスタムがしにくいので独自に作成.
 *  - 空白指定したい場合には全角空白を設定する.
 *  - 指定可能なclassName: eleki-table, eleki-table-auto, eleki-table-border-none, eleki-table-border-none-auto
 * @param props
 * @returns
 */
const TableContentItem = (props: {
  children: React.ReactNode;
  className: string;
  title: string;
}) => {
  if (typeof props.children !== 'string') {
    console.log('TableComponent contains an invalid element!!');
    return;
  }

  // 半角スペースのみ取り除く
  const trimHalfSpace = (value: string) => {
    return value.replaceAll('　', '@@@').trim().replaceAll('@@@', '　');
  };

  // 入力されたテーブル行を取得
  let rows = props.children.split('\n');
  rows = rows.filter((row) => row != null && row != '');

  // th
  let thValues = rows[0]?.split('|');
  if (!thValues || !(thValues.length > 0)) {
    console.log("TableComponent don't convert th!!");
    return;
  }
  thValues = thValues
    .map((row) => trimHalfSpace(row))
    .filter((row) => row != null && row.length > 0);

  if (rows.length <= 2) {
    console.log('TableComponent not contain td!!');
    return;
  }

  // TODO 2行目の情報から文字寄せの情報も取得したいなぁ...(願望)

  // td
  const tdValuesRows = [];
  for (let i = 2; i < rows.length; i++) {
    let tdValues = rows[i]?.split('|');
    if (!tdValues || !(tdValues.length > 0)) {
      console.log(`TableComponent don't ${i} convert td!!`);
      continue;
    }
    tdValues = tdValues
      .map((row) => (row === '  ' ? row : trimHalfSpace(row)))
      .filter((row) => row != null && row.length > 0);
    if (tdValues.length !== thValues.length) {
      console.log(`TableComponent diff td ${i} column count!!`);
      continue;
    }
    tdValuesRows.push(tdValues);
  }

  return (
    <>
      {props.title ? <div css={styleTableTitle}>{props.title}</div> : <></>}
      <table className={props.className}>
        <thead>
          <tr>
            {thValues.map((column, i) => (
              <th key={i}>
                <div dangerouslySetInnerHTML={{ __html: column }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tdValuesRows.map((tdValues, i) => (
            <tr key={i}>
              {tdValues.map((column, j) => (
                <td key={j}>
                  <div dangerouslySetInnerHTML={{ __html: column }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default TableContentItem;
