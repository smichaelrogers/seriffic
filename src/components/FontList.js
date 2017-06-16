import React from 'react'
import { getFonts } from '../store'
import FontListItem from './FontListItem'

class FontList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fonts: [],
      selection: [],
      filterSelection: false,
      isLoading: false,
      displayText: 'Handgloves',
      fontSize: 20,
      filterSelection: false,
    }
    this.handleDisplayTextChange = this.handleDisplayTextChange.bind(this)
    this.handleFontSelect = this.handleFontSelect.bind(this)
    this.handleFontDeselectAll = this.handleFontDeselectAll.bind(this)
    this.handleToggleFilterSelection = this.handleToggleFilterSelection.bind(this)
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    getFonts().then(fonts => {
      console.log(`loaded ${fonts.length} fonts`)
      this.setState({
        fonts: fonts,
        isLoading: false
      })
    })
  }
  handleToggleFilterSelection() {
    this.setState({
      filterSelection: !this.state.filterSelection
    })
  }
  handleFontDeselectAll() {
    this.setState({
      selection: []
    })
  }
  handleFontSelect(font) {
    const selection = this.state.selection
    const idx = selection.indexOf(font)
    if (idx !== -1) {
      this.setState({
        selection: [
          ...selection.slice(0, idx),
          ...selection.slice(idx + 1)
        ].sort()
      })
    } else {
      this.setState({
        selection: [
          ...selection,
          font
        ].sort()
      })
    }
  }
  handleDisplayTextChange(e) {
    this.setState({
      displayText: e.target.value
    })
  }
  render() {
    const {
      fonts,
      displayText,
      fontSize,
      selection,
      fontsRendered,
      isLoading,
      filterSelection,
    } = this.state;

    const displayedFonts = filterSelection ? selection : fonts

    return (
      <main>
        <header>
          <input
            type="text"
            value={displayText}
            onChange={this.handleDisplayTextChange}
          />
        </header>
        <ul>
          {displayedFonts.map((font, idx) => (
            <FontListItem
              key={font}
              onClick={this.handleFontSelect}
              fontFamily={font}
              fontSize={fontSize}
              displayText={displayText}
              isSelected={selection.includes(font)}
            />
          ))}
        </ul>
        <footer>
          <button
            className={filterSelection && 'active'}
            onClick={this.handleToggleFilterSelection}>
            Filter Selection
          </button>
          <button onClick={this.handleFontDeselectAll}>
            Reset Selection
          </button>
        </footer>
      </main>
    );
  }
}

export default FontList
