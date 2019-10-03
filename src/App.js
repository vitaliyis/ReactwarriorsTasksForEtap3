import React from 'react';
import './App.css';
import {Item} from './components/Item'
import NavigationRange from "./components/NavigationRange";

export default class App extends React.Component{
  constructor() {
    super()

    this.state = {
      items: [],
      isLoading: false,
      enableAutoRefresh: false,
      minComments: 0,
      maxNumberComments: 0
    }
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = () => {
    this.setState({
      isLoading: true
    });
    fetch('https://www.reddit.com/r/reactjs.json?limit=100')
      .then(response => {
        return response.json()
      })
      .then(data => {
        const max = data.data.children.reduce((max, current) => (
          (max > current.data.num_comments) ? max : current.data.num_comments
        ), 0)
        this.setState({
          items: data.data.children,
          isLoading: false,
          maxNumberComments: max
        })

      })
  }

  updateAutoRefresh = () => {
    this.setState(state => ({
        enableAutoRefresh: !state.enableAutoRefresh
      }),
      () => {
        if (this.state.enableAutoRefresh) {
          this.autoRefresh = setInterval(this.getItems, 3000);
        } else {
          clearInterval(this.autoRefresh)
        }
      }
      )
  }

  updateMinComments = event => {
    this.setState({
      minComments: Number(event.target.value)
    })
  }

  getItemsByComments = (items, minComments) => items
      .filter(item => item.data.num_comments >= minComments)
      .sort((a,b) => b.data.num_comments - a.data.num_comments)


  render() {
    const {items, isLoading, enableAutoRefresh, minComments, maxNumberComments} = this.state
    const itemsByComments = this.getItemsByComments(items, minComments)

    return (
        <div className="container">
          <h1 className="title mt-4 mb-4">Top commented</h1>
          <button
            type="button"
            className="btn btn-secondary mb-4"
            onClick={this.updateAutoRefresh}
          >
            {enableAutoRefresh ? "Stop" : "Start"} auto-refresh
          </button>
          <NavigationRange
            minComments={minComments}
            updateMinComments={this.updateMinComments}
            maxNumberComments={maxNumberComments + 1}
          />
          <div className="row">
            {isLoading ? (
              <div className="d-flex justify-content-center w-100">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : itemsByComments.length > 0 ? itemsByComments.map(item => {
              return (
                <div className="col-4 mb-2" key={item.data.id}>
                  <Item data={item.data}/>
                </div>
              )
            }) : <p>No results found matching your criteria</p>
            }
          </div>


        </div>
    );
  }
}

