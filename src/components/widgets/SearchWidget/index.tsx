import { Theme, css, keyframes } from '@emotion/react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BiSearch } from 'react-icons/bi';
import SiteSettings from 'settings/SiteSettings';

const fadeInKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 100;
  }
`;

const styleRoot = css`
  margin-bottom: 1.4em;
`;

const styleSearchForm = css`
  position: relative;
`;

const styleSearchInput = css`
  width: 100%;
  height: 48px;
  border-radius: 6px;
  padding: 8px;
  box-sizing: border-box;
  animation: ${fadeInKeyframes} 0.7s ease 0s 1 normal;
  font-size: 16px; // 16px以上にしないとタップ時にsafariで拡大される
`;

const styleSearchButton = (theme: Theme) => css`
  position: absolute;
  right: 12px;
  top: calc(50% - 12px);
  height: 24px;
  border: none;
  color: ${theme.colors.primaryLightGray};
  background-color: transparent;
  cursor: pointer;
`;

type SearchFormData = {
  searchWord: string;
};

/**
 * 検索ウィジェット
 * @returns
 */
const SearchWidget = (props: {
  setSearchWordStateAction?: (slug: string) => void;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>();

  const onSubmit: SubmitHandler<SearchFormData> = async (data) => {
    // 検索ワードをクリパラメータに設定
    const searchWord = data.searchWord.replaceAll(' ', '');
    const encodeSearchWord = encodeURI(searchWord).toLowerCase();
    router.push(
      `/?${SiteSettings.UrlParamNameSearch}=${encodeSearchWord}`,
      undefined,
      {
        shallow: true,
        scroll: true,
      },
    );
    if (props.setSearchWordStateAction) {
      props.setSearchWordStateAction(encodeSearchWord);
    }
  };
  return (
    <aside css={styleRoot}>
      <form css={styleSearchForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('searchWord', { required: false })}
          css={styleSearchInput}
          type="text"
          placeholder="サイト内を検索"
          maxLength={20}
        ></input>
        <button css={styleSearchButton} type="submit">
          <BiSearch size={'1.2rem'} />
        </button>
      </form>
    </aside>
  );
};
export default SearchWidget;
