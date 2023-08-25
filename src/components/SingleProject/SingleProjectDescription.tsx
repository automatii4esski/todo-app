import { getDate } from '../../utils/getDate';
import { MyFC } from '../../types/common';
import SingleProjectDescriptionCreateForm from '../CreateForms/SingleProjectDescriptionCreateForm';
import { ISingleProjectDescription } from '../../types/singleProject';

const SingleProjectDescription: MyFC<ISingleProjectDescription> = ({
  additionalDescs,
  desc,
  onSubmitAdditionalDesc,
}) => {
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
      <SingleProjectDescriptionCreateForm
        onSubmitAdditionalDesc={onSubmitAdditionalDesc}
      />
    </>
  );
};

export default SingleProjectDescription;
