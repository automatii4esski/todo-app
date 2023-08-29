import { getDate } from '../../utils/getDate';
import { MyFC } from '../../types/common';
import { ISingleProjectDescription } from '../../types/singleProject';
import { getCreateCommentFormMethods } from '../../utils/singleProject/descFormMethods';
import { useState, FocusEvent, FormEvent } from 'react';
import { ReactComponent as DeleteIcon } from '../../images/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../images/icons/edit.svg';
import MyTextarea from '../UI/textarea/MyTextarea';
import { ProjectService } from '../../API/ProjectService';
import { IProjectComment } from '../../types/project';

const SingleProjectDescription: MyFC<ISingleProjectDescription> = ({
  project,
}) => {
  const [isShowButton, setIsShowButton] = useState(true);
  const [currentComment, setCurentComment] = useState<IProjectComment>({
    text: '',
    date: 0,
  });
  const [comments, setComments] = useState(project.comments);
  const [formType, setFormType] = useState<'edit' | 'add'>('add');

  const formMethods = getCreateCommentFormMethods(
    setIsShowButton,
    currentComment,
    setComments,
    setCurentComment,
    comments,
    project,
    setFormType
  );

  const onEditCommentClick = function (comment: IProjectComment) {
    return () => {
      setIsShowButton(false);
      setFormType('edit');
      setCurentComment(comment);
    };
  };

  const onEditCommentSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsShowButton(true);

    if (!currentComment.text) return;
    const comment = comments.find((comm) => comm.date === currentComment.date);
    comment!.text = currentComment.text;

    setComments(comments);

    ProjectService.putById(project);
    setCurentComment({
      text: '',
      date: 0,
    });
  };

  const onSubmitComment = function (e: FormEvent<HTMLFormElement>) {
    if (formType === 'add') {
      formMethods.onSubmitForm(e);
    } else {
      onEditCommentSubmit(e);
    }
  };

  const onDeleteCommentClick = function (commentDate: number) {
    return () => {
      const newComments = comments.filter((comm) => comm.date !== commentDate);
      setComments(newComments);
      project.comments = newComments;
      ProjectService.putById(project);
    };
  };

  const onTextareaFocus = function (e: FocusEvent<HTMLTextAreaElement>) {
    const valueLength = e.target.value.length;
    e.target.setSelectionRange(valueLength, valueLength);
  };

  return (
    <>
      <div className="singleproject__description">
        <h3 className="singleproject__sub-title singleproject__description-title">
          Description
        </h3>
        <p className="singleproject__description-text">{project.desc}</p>
        {comments.map((comm) => (
          <div key={comm.date} className="singleproject__comment">
            <div className="singleproject__comment-top">
              <div className="singleproject__comment-date">
                Created at {getDate(comm.date)}
              </div>
              <div className="singleproject__comment-buttons">
                <button
                  onClick={onEditCommentClick(comm)}
                  className="singleproject__comment-action singleproject__comment-edit"
                >
                  <EditIcon className="singleproject__edit-icon" />
                </button>
                <button
                  onClick={onDeleteCommentClick(comm.date)}
                  className="singleproject__comment-action singleproject__comment-delete"
                >
                  <DeleteIcon className="singleproject__delete-icon" />
                </button>
              </div>
            </div>

            <p className="singleproject__comment-text">{comm.text}</p>
          </div>
        ))}
      </div>
      <div className={`singleproject__comment-box`}>
        {isShowButton ? (
          <button
            onClick={formMethods.addComment}
            className={`singleproject__comment-add`}
          >
            Add the comment
            <span className="singleproject__comment-plus">+</span>
          </button>
        ) : (
          <form
            className="singleproject__comment-form"
            onSubmit={onSubmitComment}
          >
            <MyTextarea
              value={currentComment.text}
              autoFocus
              onFocus={onTextareaFocus}
              onChange={formMethods.onTextAreaChange}
              className={`singleproject__comment-input`}
              placeholder="Type desc"
            />
            <div className="singleproject__comment-btns">
              <button
                className="singleproject__btn singleproject__comment-submit"
                type="submit"
              >
                {formType}
              </button>
              <button
                onClick={formMethods.onCloseComment}
                className="singleproject__btn singleproject__comment-close"
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default SingleProjectDescription;
