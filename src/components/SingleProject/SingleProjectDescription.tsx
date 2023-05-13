import React, { useRef, useState, ChangeEvent } from 'react';
import MyTextarea from '../UI/textarea/MyTextarea';
import { getDate } from '../../utils/getDate';
import { IAditionalDesc, MyFC } from '../../types/types';

interface ISingleProjectDescription {
  desc: string;
  additionalDescs: IAditionalDesc[];
  onSubmitAdditionalDesc: (newText: string) => void;
}

const SingleProjectDescription: MyFC<ISingleProjectDescription> = ({
  additionalDescs,
  desc,
  onSubmitAdditionalDesc,
}) => {
  const [additionalDescClass, setAdditionalDescClass] = useState({
    button: '',
    input: 'disabled',
  });

  const additioanalDescInputRef = useRef<HTMLTextAreaElement>(null);

  const onCloseAdditionalDesc = function () {
    setAdditionalDescClass({
      button: '',
      input: 'disabled',
    });

    additioanalDescInputRef.current!.value = '';
  };

  const addAdditionalDesc = function () {
    setAdditionalDescClass({
      button: 'disabled',
      input: '',
    });
    additioanalDescInputRef.current?.focus();
  };

  return (
    <>
      <div className="singleproject__description">
        <h3 className="singleproject__sub-title singleproject__description-title">
          Description
        </h3>
        <p className="singleproject__description-text">{desc}</p>
        {additionalDescs.map((desc) => (
          <p key={desc.date} className="singleproject__description-addition">
            <span className="singleproject__description-date">
              {getDate(desc.date)}
            </span>
            {desc.text}
          </p>
        ))}
      </div>
      <div
        className={`singleproject__description-box ${additionalDescClass.button}`}
      >
        <button
          onClick={addAdditionalDesc}
          className="singleproject__description-add"
        >
          +
        </button>
      </div>
      <div className={additionalDescClass.input}>
        <form
          className="singleproject__description-form"
          onSubmit={(e) => {
            e.preventDefault();
            setAdditionalDescClass({
              button: '',
              input: 'disabled',
            });

            if (!additioanalDescInputRef.current!.value) return;

            onSubmitAdditionalDesc(additioanalDescInputRef.current!.value);
            additioanalDescInputRef.current!.value = '';
          }}
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
              onClick={onCloseAdditionalDesc}
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

export default SingleProjectDescription;
