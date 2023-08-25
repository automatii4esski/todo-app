import { IAdditionalDescClass } from '../../types/singleProject';
import { FormEvent } from 'react';
const onCloseAdditionalDesc = function (
  setAdditionalDescClass: (descClass: IAdditionalDescClass) => void,
  additioanalDescInputRef: React.RefObject<HTMLTextAreaElement>
) {
  return () => {
    setAdditionalDescClass({
      button: '',
      input: 'disabled',
    });

    additioanalDescInputRef.current!.value = '';
  };
};

const onSubmitForm = function (
  setAdditionalDescClass: (descClass: IAdditionalDescClass) => void,
  additioanalDescInputRef: React.RefObject<HTMLTextAreaElement>,
  onSubmitAdditionalDesc: (desc: string) => void
) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdditionalDescClass({
      button: '',
      input: 'disabled',
    });

    if (!additioanalDescInputRef.current!.value) return;

    onSubmitAdditionalDesc(additioanalDescInputRef.current!.value);
    additioanalDescInputRef.current!.value = '';
  };
};

const addAdditionalDesc = function (
  setAdditionalDescClass: (descClass: IAdditionalDescClass) => void,
  additioanalDescInputRef: React.RefObject<HTMLTextAreaElement>
) {
  return () => {
    setAdditionalDescClass({
      button: 'disabled',
      input: '',
    });
    additioanalDescInputRef.current!.focus();
  };
};

export const getCreateDescFormMethods = function (
  setAdditionalDescClass: (descClass: IAdditionalDescClass) => void,
  additioanalDescInputRef: React.RefObject<HTMLTextAreaElement>,
  onSubmitAdditionalDesc: (desc: string) => void
) {
  return {
    onCloseAdditionalDesc: onCloseAdditionalDesc(
      setAdditionalDescClass,
      additioanalDescInputRef
    ),
    onSubmitForm: onSubmitForm(
      setAdditionalDescClass,
      additioanalDescInputRef,
      onSubmitAdditionalDesc
    ),
    addAdditionalDesc: addAdditionalDesc(
      setAdditionalDescClass,
      additioanalDescInputRef
    ),
  };
};
