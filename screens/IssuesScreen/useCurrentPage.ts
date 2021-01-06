import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../redux';
import { ActionSheetIOS, FlatList, LayoutAnimation } from 'react-native';
import { useRef, useState } from 'react';
import { Issue, IssueSortCriteria, CurrentPageHookReturnValue as useCurrentPageReturnValue } from '../../types/issues';
import * as issueActions from '../../redux/actions/issues';

export default function usePage(): useCurrentPageReturnValue {
  const issuesReducer = useSelector((state: IApplicationState) => state.issuesReducer);
  const { error, organizationId, repoId } = issuesReducer;

  const dispatch = useDispatch();

  const setOrganizationId = (id: string) => {
    dispatch(issueActions.setOrganizationId(id));
  };
  const setRepoId = (id: string) => {
    dispatch(issueActions.setRepoId(id));
  };

  const flatListRef = useRef<FlatList<Issue>>(null);

  const pickSortCriterion = (sortCriteria: IssueSortCriteria[]): Promise<string> => {
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
    data: {
      organizationId,
      repoId,
      isPickerOpen,
      isScrolled,
      flatListRef,
      error,
    },
    actions: {
      setOrganizationId,
      setRepoId,
      pickSortCriterion,
      setIsPickerOpen: (value: boolean) => {
        LayoutAnimation.easeInEaseOut();
        setIsPickerOpen(value);
      },
      setIsScrolled,
    },
  };
}
