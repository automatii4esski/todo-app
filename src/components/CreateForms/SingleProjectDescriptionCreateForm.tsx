import { useState, useRef } from 'react';
import { MyFC } from '../../types/common';
import MyTextarea from '../UI/textarea/MyTextarea';
import {
  IAdditionalDescClass,
  ISingleProjectDescriptionCreateForm,
} from '../../types/singleProject';
import { getCreateDescFormMethods } from '../../utils/singleProject/descFormMethods';

const SingleProjectDescriptionCreateForm: MyFC<
  ISingleProjectDescriptionCreateForm
> = ({ onSubmitAdditionalDesc }) => {
  const [additionalDescClass, setAdditionalDescClass] =
    useState<IAdditionalDescClass>({
      button: '',
      input: 'disabled',
    });

  const additioanalDescInputRef = useRef<HTMLTextAreaElement>(null);

  const formMethods = getCreateDescFormMethods(
    setAdditionalDescClass,
    additioanalDescInputRef,
    onSubmitAdditionalDesc
  );

  return (
    <>
      <div
        className={`singleproject__description-box ${additionalDescClass.button}`}
      >
        <button
          onClick={formMethods.addAdditionalDesc}
          className="singleproject__description-add"
        >
          +
        </button>
      </div>
      <div className={additionalDescClass.input}>
        <form
          className="singleproject__description-form"
          onSubmit={formMethods.onSubmitForm}
        >
          <MyTextarea
            reference={additioanalDescInputRef}
            className={`singleproject__description-input`}
            placeholder="Type desc"
          />
          <div className="singleproject__description-btns">
            <button
              className="singleproject__btn singleproject__description-submit"
              type="submit"
            >
              Add
            </button>
            <button
              onClick={formMethods.onCloseAdditionalDesc}
              className="singleproject__btn singleproject__description-close"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleProjectDescriptionCreateForm;
