import "./postView.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import Vote from "./Vote";
import CommentEditor from "./commentEditor";
import ProfileIcon from "../CardProfile/ProfileIcon";

const PostView = () => {
  const location = useLocation();
  const post = location.state.post;
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    console.log(post.ownerId);
    AuthService.FindProfile(post.ownerId).then((profile) => {
      setAuthor(profile);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="PostView ">
      <div className="fullPost">
        <div className="card">
          <div className="postContent">
            <h2
              className="fitText"
              style={{
                color: "var(--secondary-bg-color)",
              }}
            >
              {post.header}
            </h2>
            <p className="fitText">{post.brief}</p>
            <p className="fitText">{post.description}</p>
          </div>
          <div className="lowerPost">
            {author ? (
              <div className="card author">
                {<p>{author.name}</p>}
                <ProfileIcon name={author.name} />
              </div>
            ) : (
              <div
                className="card"
                style={{
                  height: "100px",
                  width: "200px",
                }}
              ></div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div className="tags">
                <p style={{ fontSize: "12px" }}>Tags:</p>
                <div style={{ display: "flex" }}>
                  {post.tags.map((tag, index) => (
                    <div className="tag" key={post._id + index}>
                      <p>{tag}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Vote post={post} />
            </div>
          </div>
          <p
            style={{
              borderTop: "3px solid var(--primary-bg-color)",
              borderBottom: "3px solid var(--primary-bg-color)",
            }}
          >
            last modified: {post.lastModifiedDate.slice(0, 10)}
          </p>
        </div>
        <CommentEditor post={post}></CommentEditor>
      </div>
    </div>
  );
};

export default PostView;
