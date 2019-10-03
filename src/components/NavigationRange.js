import React from 'react'

export default class NavigationRange extends React.Component{
  render() {
    const {minComments, updateMinComments, maxNumberComments} = this.props
    return (
      <div>
        <p className="title">Current filter: {minComments}</p>
        <div className="mb-4">
          <input
            type="range"
            value={minComments}
            onChange={updateMinComments}
            min={0}
            max={maxNumberComments}
            className="w-100 form-control-range"
          />
        </div>
      </div>
    )
  }
}