import { ICommentClass } from '../../types/singleProject';
import { FormEvent, ChangeEvent } from 'react';
const onCloseComment = function (
  setIsShowButton: (isShow: boolean) => void,
  setComment: (value: string) => void
) {
  return () => {
    setIsShowButton(true);

    setComment('');
  };
};

const onSubmitForm = function (
  setIsShowButton: (isShow: boolean) => void,
  onSubmitComment: (comment: string) => void,
  comment: string,
  setComment: (value: string) => void
) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsShowButton(true);

    if (!comment) return;

    onSubmitComment(comment);
    setComment('');
  };
};

const addComment = function (setIsShowButton: (isShow: boolean) => void) {
  return () => {
    setIsShowButton(false);
  };
};

const ocTextAreaChange = function (setComment: (value: string) => void) {
  return (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
};

export const getCreateCommentFormMethods = function (
  setIsShowButton: (isShow: boolean) => void,
  onSubmitComment: (comment: string) => void,
  commentValue: string,
  setCommentValue: (value: string) => void
) {
  return {
    onCloseComment: onCloseComment(setIsShowButton, setCommentValue),
    onSubmitForm: onSubmitForm(
      setIsShowButton,
      onSubmitComment,
      commentValue,
      setCommentValue
    ),
    addComment: addComment(setIsShowButton),
    ocTextAreaChange: ocTextAreaChange(setCommentValue),
  };
};
