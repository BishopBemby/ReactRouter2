import { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import { getAllComments } from "../../lib/api";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router-dom";
import CommentList from "../comments/CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  const { quoteId } = params;
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  //use useCallback hook as adding commnt in form can create infinte loop as it used as dependency there in useEffect so whenever parent changes, it will be recreated. and thius added depnedenicies here for the first time only.
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let content;
  if (status === "pending") {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "completed" && (loadedComments || loadedComments.length > 0)) {
    content = <CommentList comments={loadedComments}></CommentList>;
  }
  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    content = <p className="centered">No Comments were added!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          onAddComment={addedCommentHandler}
          id={params.quoteId}
        />
      )}
      {content}
    </section>
  );
};

export default Comments;
