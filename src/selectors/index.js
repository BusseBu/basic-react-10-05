export function filterArticles({ articles, filter }) {
  return articles.filter((article) => {
    for (let type in filter) {
      switch (type) {
        case 'select':
          return filter.select.length
            ? filter.select.map((el) => el.value).includes(article.id)
            : true

        case 'date':
          let aDate = new Date(article.date)
          let start =
            filter.date[0] instanceof Date
              ? filter.date[0]
              : new Date(filter.date[0])
          let finish =
            filter.date[1] instanceof Date
              ? filter.date[1]
              : new Date(filter.date[1])
          if (aDate < start || aDate > finish) return false
          break

        default:
          break
      }
    }

    return true
  })
}
