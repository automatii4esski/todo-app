const onClickCreateProject = (setIsPopupActive: (value: boolean) => void) => {
  setIsPopupActive(true);
};

const onHideCreateForm = (setIsPopupActive: (value: boolean) => void) => {
  setIsPopupActive(false);
};

export const getCreateFormPopupMethods = function (
  setIsPopupActive: (value: boolean) => void
) {
  return {
    onHideCreateForm: () => {
      onHideCreateForm(setIsPopupActive);
    },
    onClickCreateProject: () => {
      onClickCreateProject(setIsPopupActive);
    },
  };
};
