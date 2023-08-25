import { ISingleProjectMicrotasksCreateForm } from '../../types/singleProject';
import { MyFC } from '../../types/common';
import MyTextarea from '../UI/textarea/MyTextarea';

const SingleProjectMicrotasksCreateForm: MyFC<
  ISingleProjectMicrotasksCreateForm
> = ({ formMethods, createState, descInputValue, btnClasses }) => {
  return (
    <>
      <div
        className={`singleproject-microtasks__create${createState.class}`}
        onClick={formMethods.onOutCreateFormClick}
      >
        <form
          onClick={formMethods.onCreateFormClick}
          className="singleproject-microtasks__create-form"
        >
          <MyTextarea
            value={descInputValue}
            onChange={formMethods.onDescInputChange}
            className="singleproject-microtasks__create-input"
            placeholder="Description"
          />
          <div className="singleproject-microtasks__create-btn">
            <button
              className={`singleproject__btn${btnClasses.edit} singleproject-microtasks__create-edit`}
              type="submit"
              onClick={formMethods.onEditSubmit}
            >
              Edit
            </button>
            <button
              className={`singleproject__btn${btnClasses.add} singleproject-microtasks__create-submit`}
              type="submit"
              onClick={formMethods.onCreateSubmit}
            >
              Add
            </button>
            <button
              onClick={formMethods.onCloseCreateFormClick}
              className="singleproject__btn 
                singleproject-microtasks__create-close"
              type="button"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleProjectMicrotasksCreateForm;
