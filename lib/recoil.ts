import { atom, selector } from 'recoil';
import getTotalFileSize from '@/lib/get-total-file-size';

/** 로딩 State*/
const loadingState = atom<string>({
  key: 'loadingState',
  default: '',
});

/** 업로드 하는 파일 리스트 State*/
const filesState = atom<File[]>({
  key: 'filesState',
  default: [],
});

/**
 * 업로드 하는 파일 정보 리스트 State
 *
 * 파일 정보를 JSON.stringify를 사용해서 string으로 변환
 */
const fileDataState = atom<string[]>({
  key: 'fileDataState',
  default: [],
});

/** 선택한 모든 파일 크기 값 */
const totalFileSizeState = selector({
  key: 'totalFileSizeState',
  get: ({ get }) => {
    return getTotalFileSize(get(filesState));
  },
});

/** 파일 공유 시간 설정 State */
const shareTimeState = atom<number>({
  key: 'shareTimeState',
  default: 0,
});

/** 파일 공유 시간 설정 Pop Up State */
const shareTimePopUpState = atom<boolean>({
  key: 'uploadState',
  default: false,
});

export { loadingState, filesState, fileDataState, totalFileSizeState, shareTimeState, shareTimePopUpState };
