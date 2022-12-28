import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '@/redux/store';

const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export default useTypedSelector;
