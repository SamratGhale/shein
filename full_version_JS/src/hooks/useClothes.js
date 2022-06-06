import { useContext } from 'react';
import { ClothesContext } from '../contexts/ClothesContext';

// ----------------------------------------------------------------------

const useClothes= () => useContext(ClothesContext);

export default useClothes;