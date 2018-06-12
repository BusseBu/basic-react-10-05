import {
  ADD_COMMENT,
  LOAD_ARTICLE_COMMENTS,
  LOAD_ALL_COMMENTS,
  START,
  SUCCESS
} from '../constants'
import { List, Record, OrderedMap } from 'immutable'
import { arrToMap } from './utils'

const CommentRecord = Record({
  id: null,
  text: null,
  user: null
})

const ReducerRecord = Record({
  entities: new OrderedMap({}),
  loaded: new List(),
  loading: false,
  total: 0
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case ADD_COMMENT:
      return state.setIn(
        ['entities', randomId],
        new CommentRecord({
          ...payload.comment,
          id: randomId
        })
      )

    case LOAD_ALL_COMMENTS + START:
      return state.set('loading', true)

    case LOAD_ALL_COMMENTS + SUCCESS:
      const map = arrToMap(response.records, CommentRecord)
      const list = state.loaded.toArray()
      let i = 0
      map.mapKeys((v) => {
        list[(payload.page - 1) * 5 + i] = v
        i++
      })

      return state
        .set('loading', false)
        .set('total', response.total)
        .set('loaded', new List(list))
        .mergeIn(['entities'], map)

    case LOAD_ARTICLE_COMMENTS + SUCCESS:
      return state.mergeIn(['entities'], arrToMap(response, CommentRecord))

    default:
      return state
  }
}
