import { css } from '@emotion/react';
import { useState } from 'react';

const styleOpen = css``;
const styleClose = css`
  display: none;
`;

const styleCheckbox = css`
  display: none;
`;
const styleCheckLabel = css`
  line-height: 12px;
  cursor: pointer;
  user-select: none;
`;

/**
 * 開閉トグル
 * @param props
 * @returns
 */
const FoldToggle = (props: { children: React.ReactNode; text: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isOn = e.target.checked;
    if (isOpen !== isOn) {
      setIsOpen(isOn);
    }
  };

  return (
    <>
      <div>
        <label css={styleCheckLabel}>
          <input type="checkbox" onChange={handleChange} css={styleCheckbox} />
          {isOpen ? '▼' : '▶︎'} {props.text ?? '折りたたみ'}
        </label>
        <span css={isOpen ? styleOpen : styleClose}>{[props.children]}</span>
      </div>
    </>
  );
};
export default FoldToggle;
