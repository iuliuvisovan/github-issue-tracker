import { useDispatch } from 'react-redux';
import { LayoutAnimation } from 'react-native';

export default function useList(actions) {
  const dispatch = useDispatch();

  const getList = (): void => {
    dispatch(actions.getList());
  };

  const goToPage = (page: number): void => {
    dispatch(actions.setPage(page));
  };

  const toggleFilter = (filterId: string): void => {
    LayoutAnimation.easeInEaseOut();
    dispatch(actions.toggleFilter(filterId));
  };

  const setSortCriterion = (criterionId: string) => {
    dispatch(actions.setSortCriterion(criterionId));
  };

  return {
    getList,
    toggleFilter,
    setSortCriterion,
    goToPage,
  };
}
