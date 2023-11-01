import * as api from "../api/index";

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(fetchAllQuestions());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllQuestions = () => async (disptach) => {
  try {
    const { data } = await api.getAllQuestions();
    disptach({ type: "FETCH_ALL_QUESTIONS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = (id, userId, navigate) => async (dispatch) => {
  try {
    await api.deleteQuestion(id,userId);
    dispatch(fetchAllQuestions());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    await api.voteQuestion(id, value, userId);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const { userId, id, noOfAnswers, answerBody, userAnswered } = answerData;
    const { data } = await api.postAnswer(
      userId,
      id,
      noOfAnswers,
      answerBody,
      userAnswered
    );
    dispatch({ type: "POST_ANSWER", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = (id, answerId, noOfAnswers, userId) => async (dispatch) => {
  try {
    await api.deleteAnswer(id, answerId, noOfAnswers,userId);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};
