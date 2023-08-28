import { getDate } from '../../utils/getDate';
import { MyFC } from '../../types/common';
import SingleProjectCommentCreateForm from '../CreateForms/SingleProjectCommentCreateForm';
import { ISingleProjectDescription } from '../../types/singleProject';

const SingleProjectDescription: MyFC<ISingleProjectDescription> = ({
  comments,
  desc,
  onSubmitComment,
}) => {
  return (
    <>
      <div className="singleproject__description">
        <h3 className="singleproject__sub-title singleproject__description-title">
          Description
        </h3>
        <p className="singleproject__description-text">{desc}</p>
        {comments.map((comm) => (
          <p key={comm.date} className="singleproject__comment">
            <span className="singleproject__comment-date">
              Created at {getDate(comm.date)}
            </span>
            {comm.text}
          </p>
        ))}
      </div>
      <SingleProjectCommentCreateForm onSubmitComment={onSubmitComment} />
    </>
  );
};

export default SingleProjectDescription;
