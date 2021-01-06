import { useSelector } from 'react-redux';
import { IApplicationState } from '../../redux';
import { ActionSheetIOS, LayoutAnimation } from 'react-native';
import { useState } from 'react';
import { IIssueSortCriteria } from '../../types/issues';

export default function usePage() {
  const issuesReducer = useSelector((state: IApplicationState) => state.issuesReducer);
  const { error, organizationId, repoId } = issuesReducer;

  const pickSortCriterion = (sortCriteria: IIssueSortCriteria[]): Promise<string> => {
    return new Promise((resolve) => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', ...sortCriteria.map((x) => x.label)],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex > 0) {
            resolve(sortCriteria[buttonIndex - 1].id);
          }
        }
      );
    });
  };

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  return {
    organizationId,
    repoId,
    pickSortCriterion,

    isPickerOpen,
    setIsPickerOpen: (value: boolean) => {
      LayoutAnimation.easeInEaseOut();
      setIsPickerOpen(value);
    },

    isScrolled,
    setIsScrolled,

    error,
  };
}
