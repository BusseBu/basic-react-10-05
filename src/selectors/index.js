import { createSelector } from 'reselect'

const idSelector = (_, props) => props.id

export const articlesMapSelector = (state) => state.articles.entities

export const articleListSelector = createSelector(
  articlesMapSelector,
  (articlesMap) => articlesMap.valueSeq().toArray()
)

export const loadingArticlesSelector = (state) => state.articles.loading

const filtersSelector = (state) => state.filters

export const filtersSelectionSelector = createSelector(
  filtersSelector,
  (filters) => filters.selected
)

export const filtratedArticlesSelector = createSelector(
  articleListSelector,
  filtersSelector,
  (articles, filters) => {
    const {
      selected,
      dateRange: { from, to }
    } = filters

    return articles.filter((article) => {
      const published = Date.parse(article.date)
      return (
        (!selected.length ||
          selected.find((selected) => selected.value === article.id)) &&
        (!from || !to || (published > from && published < to))
      )
    })
  }
)

export const loadedCommentsSelector = (state) => state.comments.loaded

export const loadingCommentsSelector = (state) => state.comments.loading

export const commentsMapSelector = (state) => state.comments.entities

export const commentListSelector = createSelector(
  commentsMapSelector,
  (commentsMap) => commentsMap.toJS()
)

export const createCommentSelector = () => {
  return createSelector(
    commentListSelector,
    idSelector,
    (comments, id) => comments[id]
  )
}
