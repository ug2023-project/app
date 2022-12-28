import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';

const useTypedDispatch = () => useDispatch<AppDispatch>();

export default useTypedDispatch;
