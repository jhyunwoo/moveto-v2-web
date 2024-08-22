import { atom, selector } from 'recoil';
import getTotalFileSize from '@/lib/get-total-file-size';

const loadingState = atom<string>({
  key: 'loadingState',
  default: '',
});

const filesState = atom<File[]>({
  key: 'filesState',
  default: [],
});

const fileDataState = atom<string[]>({
  key: 'fileDataState',
  default: [],
});

const totalFileSizeState = selector({
  key: 'totalFileSizeState',
  get: ({ get }) => {
    return getTotalFileSize(get(filesState));
  },
});

const shareTimeState = atom<number>({
  key: 'shareTimeState',
  default: 0,
});

const uploadState = atom<boolean>({
  key: 'uploadState',
  default: false,
});

export { loadingState, filesState, fileDataState, totalFileSizeState, shareTimeState, uploadState };
