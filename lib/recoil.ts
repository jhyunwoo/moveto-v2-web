import { atom } from 'recoil'

const loadingState = atom({
  key: 'loadingState',
  default: false,
})

const filesState = atom<File[]>({
  key: 'filesState',
  default: [],
})

const fileDataState = atom<string[]>({
  key: 'fileDataState',
  default: [],
})

export { loadingState, filesState, fileDataState }
