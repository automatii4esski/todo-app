import { useState, useRef } from 'react';
import { MyFC } from '../../types/common';
import MyTextarea from '../UI/textarea/MyTextarea';
import { ISingleProjectCommentCreateForm } from '../../types/singleProject';
import { getCreateCommentFormMethods } from '../../utils/singleProject/descFormMethods';

const SingleProjectCommentCreateForm: MyFC<ISingleProjectCommentCreateForm> = ({
  onSubmitComment,
}) => {
  const [isShowButton, setIsShowButton] = useState(true);
  const [commentValue, setCommentValue] = useState('');

  const formMethods = getCreateCommentFormMethods(
    setIsShowButton,
    onSubmitComment,
    commentValue,
    setCommentValue
  );

  return (
    <>
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
            onSubmit={formMethods.onSubmitForm}
          >
            <MyTextarea
              value={commentValue}
              autoFocus
              onChange={formMethods.ocTextAreaChange}
              className={`singleproject__comment-input`}
              placeholder="Type desc"
            />
            <div className="singleproject__comment-btns">
              <button
                className="singleproject__btn singleproject__comment-submit"
                type="submit"
              >
                Add
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

export default SingleProjectCommentCreateForm;
