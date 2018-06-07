import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import Comment from '../comment'
import CommentForm from '../comment-form'
import toggleOpen from '../../decorators/toggleOpen'
import './style.css'
import { loadComments } from '../../ac'
import { connect } from 'react-redux'
import {
  commentListSelector,
  loadedCommentsSelector,
  loadingCommentsSelector
} from '../../selectors'
import Loader from '../common/loader'

class CommentList extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    //from toggleOpen decorator
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  }

  state = {
    hasError: false
  }

  componentDidUpdate(oldProps) {
    const { isOpen, loadComments, loading, loaded, article } = this.props

    if (!oldProps.isOpen && isOpen && !loading && !loaded) {
      loadComments(article.id)
    }
  }

  render() {
    const { isOpen, toggleOpen } = this.props
    const text = isOpen ? 'hide comments' : 'show comments'
    return (
      <div>
        <button onClick={toggleOpen} className="test__comment-list--btn">
          {text}
        </button>
        <CSSTransition
          transitionName="comments"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.getBody()}
        </CSSTransition>
      </div>
    )
  }

  getBody() {
    const { article, loading, loaded, isOpen } = this.props
    if (!isOpen) return null
    if (this.state.hasError) return <h3>Some Error</h3>
    if (loading) return <Loader />
    if (!loaded) return null

    return (
      <div className="test__comment-list--body">
        {article.comments.length ? (
          this.getComments()
        ) : (
          <h3 className="test__comment-list--empty">No comments yet</h3>
        )}
        <CommentForm articleId={article.id} />
      </div>
    )
  }

  getComments() {
    return (
      <ul>
        {this.props.article.comments.map((id) => (
          <li key={id} className="test__comment-list--item">
            <Comment id={id} />
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(
  (state) => ({
    comments: commentListSelector(state),
    loading: loadingCommentsSelector(state),
    loaded: loadedCommentsSelector(state)
  }),
  { loadComments }
)(toggleOpen(CommentList))
