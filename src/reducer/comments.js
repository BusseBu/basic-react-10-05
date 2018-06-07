import { Record } from 'immutable'
import { ADD_COMMENT, LOAD_COMMENTS, START, SUCCESS } from '../constants'
import { arrToMap } from './utils'

const CommentModel = new Record({
  id: null,
  text: null,
  user: null
})

const ReducerRecord = new Record({
  entities: arrToMap([], CommentModel),
  loading: false,
  loaded: false,
  error: null
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case ADD_COMMENT:
      return state.update('entities', (comments) =>
        comments.set(randomId, {
          ...payload.comment,
          id: randomId
        })
      )

    case LOAD_COMMENTS + START:
      return state.set('loading', true)

    case LOAD_COMMENTS + SUCCESS:
      return state
        .set('entities', arrToMap(response, CommentModel))
        .set('loading', false)
        .set('loaded', true)

    default:
      return state
  }
}
