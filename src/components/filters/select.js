import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { filterArticles } from '../../ac'
import { connect } from 'react-redux'

class SelectFilter extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    selected: PropTypes.array
  }

  get options() {
    return this.props.articles.map((article) => ({
      label: article.title,
      value: article.id
    }))
  }

  render() {
    return (
      <Select
        options={this.options}
        value={this.props.selected}
        onChange={this.handleChange}
        isMulti
      />
    )
  }

  handleChange = (articles) => this.props.filterArticles({ select: articles })
}

export default connect(
  (state) => ({
    articles: state.articles,
    selected: state.select
  }),
  { filterArticles }
)(SelectFilter)
