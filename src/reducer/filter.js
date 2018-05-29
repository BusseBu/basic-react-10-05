import { FILTER_ARTICLE } from '../constants'

export default (filterState = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case FILTER_ARTICLE:
      return { ...filterState, ...payload.filter }

    default:
      return { ...filterState }
  }
}
