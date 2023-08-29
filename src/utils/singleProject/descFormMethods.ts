import { ProjectService } from '../../API/ProjectService';
import { IProject, IProjectComment } from '../../types/project';
import { ICommentClass } from '../../types/singleProject';
import { FormEvent, ChangeEvent } from 'react';
const onCloseComment = function (
  setIsShowButton: (isShow: boolean) => void,
  setCurrentComment: (comment: IProjectComment) => void
) {
  return () => {
    setIsShowButton(true);

    setCurrentComment({ date: 0, text: '' });
  };
};

const onSubmitForm = function (
  setIsShowButton: (isShow: boolean) => void,
  comment: IProjectComment,
  setCurrentComment: (comment: IProjectComment) => void,
  comments: IProjectComment[],
  setComments: (comments: IProjectComment[]) => void,
  project: IProject
) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsShowButton(true);

    if (!comment) return;
    const newComments = [
      ...comments,
      {
        date: Date.now(),
        text: comment.text,
      },
    ];
    setComments(newComments);

    project.comments = newComments;

    ProjectService.putById(project);
    setCurrentComment({ date: 0, text: '' });
  };
};

const addComment = function (
  setIsShowButton: (isShow: boolean) => void,
  setFormType: (value: 'edit' | 'add') => void
) {
  return () => {
    setIsShowButton(false);
    setFormType('add');
  };
};

const onTextAreaChange = function (
  currentComment: IProjectComment,
  setCurrentComment: (comment: IProjectComment) => void
) {
  return (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentComment({ ...currentComment, text: e.target.value });
  };
};

export const getCreateCommentFormMethods = function (
  setIsShowButton: (isShow: boolean) => void,
  currentComment: IProjectComment,
  setComments: (comments: IProjectComment[]) => void,
  setCurrentComment: (comment: IProjectComment) => void,
  comments: IProjectComment[],
  project: IProject,
  setFormType: (value: 'edit' | 'add') => void
) {
  return {
    onCloseComment: onCloseComment(setIsShowButton, setCurrentComment),
    onSubmitForm: onSubmitForm(
      setIsShowButton,
      currentComment,
      setCurrentComment,
      comments,
      setComments,
      project
    ),
    addComment: addComment(setIsShowButton, setFormType),
    onTextAreaChange: onTextAreaChange(currentComment, setCurrentComment),
  };
};
