import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadAllComments } from '../ac'
import { NavLink } from 'react-router-dom'
import Comment from './comment'
import Loader from './common/loader'

class CommentPage extends Component {
  static propTypes = {
    page: PropTypes.number
  }

  constructor(props) {
    super(props)
    const page = props.match.params.page || 1
    props.fetchData && props.fetchData(page)
  }

  componentWillReceiveProps() {
    const { loaded, fetchData } = this.props
    const page = this.props.match.params.page || 1
  }

  render() {
    const { loaded, loading, match } = this.props
    const page = match.params.page - 1
    if (loading) return <Loader />

    return (
      <div>
        <div>{this.getPagination()}</div>
        <ul>
          {loaded.map((id, i) => {
            if (i >= page * 5 && i < page * 5 + 5)
              return (
                <li key={id}>
                  <Comment id={id} />
                </li>
              )
          })}
        </ul>
      </div>
    )
  }

  getPagination = () => {
    let list = []
    for (let i = 1; i <= Math.ceil(this.props.total / 5); i++) {
      list.push(
        <button key={`/comments/${i}`}>
          <NavLink to={`/comments/${i}`} activeStyle={{ color: 'red' }}>
            {i}
          </NavLink>
        </button>
      )
    }
    return list
  }
}

export default connect(
  (state) => ({
    total: state.comments.total,
    loaded: state.comments.loaded,
    loading: state.comments.loading
  }),
  { fetchData: loadAllComments }
)(CommentPage)
