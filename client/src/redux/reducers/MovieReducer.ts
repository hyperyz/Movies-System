import { ISearchResult } from "../../services/CommonTypes";
import { IMovie } from "../../services/MovieService";
import { DeleteAction, MovieActions, SaveMoviesAction, SetConditionAction, SetLoadingAction } from "../actions/MovieAction";

export type IMovieCondition = Required<ISearchResult>

export interface IMovieState {
    data: IMovie[]
    condition: IMovieCondition,
    total: number,
    /**
     * 是否正在加载数据
     */
    isLoading: boolean,
    totalPage: number,
}

const defaultState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: ""
    },
    total: 0,
    isLoading: false,
    totalPage: 0,
}

type Reducer<S, A> = (state: S, action: A) => S;
const saveMovie: Reducer<IMovieState, SaveMoviesAction> = (state, action) => {
    return {
        ...state,
        data: action.payload.movies,
        total: action.payload.total,
        totalPage: Math.ceil(action.payload.total / state.condition.limit)
    }
}

const setLoading: Reducer<IMovieState, SetLoadingAction> = (state, action) => {
    return {
        ...state,
        isLoading: action.payload,
    }
}

const setCondition: Reducer<IMovieState, SetConditionAction> = (state, action) => {
    const newState = {
        ...state,
        condition: {
            ...state.condition,
            ...action.payload,
        }
    }
    newState.totalPage = Math.ceil(newState.total / newState.condition.limit)
    return newState
}

const deleteMovie: Reducer<IMovieState, DeleteAction> = (state, action) => {
    return {
        ...state,
        data: state.data.filter(movie => movie._id !== action.payload),
        total: state.total - 1,
        totalPage: Math.ceil((state.total - 1) / state.condition.limit)
    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function (state: IMovieState = defaultState, action: MovieActions) {
    switch (action.type) {
        case "movie_save":
            return saveMovie(state, action)
        case "movie_setLoading":
            return setLoading(state, action)
        case "movie_setCondition":
            return setCondition(state, action)
        case "movie_delete":
            return deleteMovie(state, action)
        default:
            return state
    }
}