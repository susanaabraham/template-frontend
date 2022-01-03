import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID, STORY_DELETE_SUCCESS, STORY_POST_SUCCESS, SPACE_UPDATED } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  space: null
};

export default function reducer (state = initialState, action)  {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case SPACE_UPDATED:
      return {
        ...state,
        space: { ...action.payload, stories: state.space.stories }
      };  

    case STORY_POST_SUCCESS:
      return {
        ...state,
        space: {
          ...state.space,
          stories: [...state.space.stories, action.payload]
        }
      };

    case STORY_DELETE_SUCCESS:
      const storyId = action.payload;
      const stories = state.space.stories
      const filterstories = stories.filter(story =>story.id!==storyId)
        
      return {
        ...state,
        space: {
          ...state.space,
          stories: filterstories
        }
      };
    default:
      return state;

  }
};
