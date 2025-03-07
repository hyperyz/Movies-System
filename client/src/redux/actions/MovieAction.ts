import { ISearchResult } from "../../services/CommonTypes"
import { IMovie, MovieService } from "../../services/MovieService"
import { IRootState } from "../reducers/RootReducer"
import { IAction } from "./ActionTypes"
import { ThunkAction } from "redux-thunk"
export type SaveMoviesAction = IAction<"movie_save", { movies: IMovie[], total: number }>

function saveMoviesAction(movies: IMovie[], total: number): SaveMoviesAction {
    return {
        type: "movie_save",
        payload: {
            movies,
            total
        }
    }
}

export type SetLoadingAction = IAction<"movie_setLoading", boolean>
function setLoadingAction(isLoading: boolean): SetLoadingAction {
    return {
        type: "movie_setLoading",
        payload: isLoading
    }
}

export type SetConditionAction = IAction<"movie_setCondition", ISearchResult>
function setConditionAction(condition: ISearchResult): SetConditionAction {
    return {
        type: "movie_setCondition",
        payload: condition
    }
}

export type DeleteAction = IAction<"movie_delete", string>
function deleteAction(id: string): DeleteAction {
    return {
        type: "movie_delete",
        payload: id
    }
}
export type MovieActions = SaveMoviesAction | SetLoadingAction | SetConditionAction | DeleteAction

// 根据条件从服务器获取电影的数据
function fetchMovies(condition: ISearchResult): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        // 1.设置加载状态
        dispatch(setLoadingAction(true))
        // 2.设置条件
        dispatch(setConditionAction(condition))
        // 3.获取服务器数据
        console.log("curCondition", getState());
        const curCondition = getState().movie?.condition;
        const resp = await MovieService.getMovies(curCondition);
        // 4.更改仓库的数据
        dispatch(saveMoviesAction(resp.data, resp.total))
        // 关闭加载状态
        dispatch(setLoadingAction(false))
    }
}

function deleteMovie(id: string): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async dispatch => {
        dispatch(setLoadingAction(true))
        await MovieService.delete(id)
        dispatch(deleteAction(id))
        dispatch(setLoadingAction(false))
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    saveMoviesAction,
    setLoadingAction,
    setConditionAction,
    deleteAction,
    fetchMovies,
    deleteMovie
}