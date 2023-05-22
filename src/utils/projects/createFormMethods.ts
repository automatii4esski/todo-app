const onClickCreateProject = (setIsPopupActive: (value: boolean) => void) => {
  setIsPopupActive(true);
};

const onHideCreateForm = (setIsPopupActive: (value: boolean) => void) => {
  setIsPopupActive(false);
};

export const getFormMethods = function (
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
