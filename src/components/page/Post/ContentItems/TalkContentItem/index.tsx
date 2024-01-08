import { css } from '@emotion/react';

const styleAddSpeechBaloon = () => css`
  // wordpress側の記事で指定してしまうと無駄に改行されてしまうためmarkdown専用
  white-space: pre-wrap;
`;

/**
 * ポジション
 * Left, Right
 */
const PositionKinds = ['l', 'r'];

/**
 * キャラクター
 * Michael, Elekibear, Jaggy, Goloyan, Plasmo
 */
const CharacterKinds = ['m', 'e', 'j', 'g', 'p'];

function getPositionClassName(position: string) {
  let className = '';
  switch (position) {
    case PositionKinds[0]:
      className = 'sbp-l';
      break;
    case PositionKinds[1]:
      className = 'sbp-r';
      break;
  }
  return className;
}

function getCharacterName(character: string) {
  let characterName = '';
  switch (character) {
    case CharacterKinds[0]:
      characterName = 'マイケル';
      break;
    case CharacterKinds[1]:
      characterName = 'エレキベア';
      break;
    case CharacterKinds[2]:
      characterName = 'ジャギィ';
      break;
    case CharacterKinds[3]:
      characterName = 'ゴロヤン';
      break;
    case CharacterKinds[4]:
      characterName = 'ぷらずも';
      break;
  }
  return characterName;
}

/**
 * キャラクターに対応する画像コンポーネントを返却する
 * @param character
 * @param option
 * @returns
 */
function getCharacterImageComponent(character: string, option: number) {
  // /img/talk/talk_[character]_[option].png
  let src = '/img/talk/talk_';
  switch (character) {
    case CharacterKinds[0]:
      src += 'michael';
      break;
    case CharacterKinds[1]:
      src += 'elekibear';
      break;
    case CharacterKinds[2]:
      src += 'jaggy';
      break;
    case CharacterKinds[3]:
      src += 'goloyan';
      break;
    case CharacterKinds[4]:
      src += 'plasmo';
      break;
  }
  src += `_${option}.png`;

  return (
    <img
      decoding="async"
      src={src}
      alt={getCharacterName(character)}
      className="speech-icon-image"
    />
  );
}

/**
 * キャラクター会話コンポーネント
 * @param props
 * @returns
 */
const TalkContentItem = (props: {
  children: React.ReactNode;
  position: string;
  character: string;
  characterOption: number;
}) => {
  if (typeof props.children !== 'string') {
    console.log('TalkComponent contains an invalid element!!');
    return;
  }

  return (
    <div className={`speech-wrap ${getPositionClassName(props.position)}`}>
      <div className="speech-person">
        <figure className="speech-icon">
          {getCharacterImageComponent(props.character, props.characterOption)}
        </figure>
        <div className="speech-name">{getCharacterName(props.character)}</div>
      </div>
      <div className="speech-balloon" css={styleAddSpeechBaloon}>
        <div dangerouslySetInnerHTML={{ __html: props.children }}></div>
      </div>
    </div>
  );
};
export default TalkContentItem;
