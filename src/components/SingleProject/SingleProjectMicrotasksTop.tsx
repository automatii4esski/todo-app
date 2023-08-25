import { ISingleProjectMicrotasksTop } from '../../types/singleProject';
import { MyFC } from '../../types/common';

const SingleProjectMicrotasksTop: MyFC<ISingleProjectMicrotasksTop> = ({
  filterMethods,
  filterClasses,
}) => {
  return (
    <>
      <h3 className="singleproject__sub-title singleproject-microtasks__title">
        Microtasks
      </h3>
      <div className="singleproject-microtasks__filter">
        <div
          onClick={filterMethods.onDone}
          className={`singleproject-microtasks__filter-item${filterClasses.done}`}
        >
          Done
        </div>
        <div
          onClick={filterMethods.onActive}
          className={`singleproject-microtasks__filter-item${filterClasses.active}`}
        >
          In progress
        </div>
        <div
          onClick={filterMethods.onAll}
          className={`singleproject-microtasks__filter-item${filterClasses.all}`}
        >
          All
        </div>
      </div>
    </>
  );
};

export default SingleProjectMicrotasksTop;
