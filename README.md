# react-overflow

A React component that detects when it's overflowed by its content. It can also tell you if you are at the edge of the scroll area.

## Installation

Install `react-overflow` using [npm](https://www.npmjs.org/):

```
npm install --save react-overflow
```

## Usage

Using the `onOverFlowChange` callback:

```jsx
import { OverflowDetector } from 'react-overflow';

function handleOverflowChange(isOverflowed) {
  console.log(isOverflowed);
}

<OverflowDetector
  onOverflowChange={handleOverflowChange}
  style={{ width: '100px' }}
>
  <div style={{ width: '200px' }}>Overflowing</div>
</OverflowDetector>
```

Using the `onScrolled` callback:

```jsx
import { OverflowDetector } from 'react-overflow';

class TextWithArrows extends React.Component {
  state = { atTop: true, atBottom: true, atLeft: true, atRight: true };
  handleScrolled = pos => this.setState(pos);
  render() {
    const { text } = this.props;
    const { atTop, atBottom, atLeft, atRight } = this.state;
    return (
      <ConstrainedTextDiv>
        <OverflowDetector onScrolled={this.handleScrolled}>
          {!atTop && <UpArrow />}
          {text}
          {!atBottom && <DownArrow />}
        </OverflowDetector>
      </ConstrainedTextDiv>
    );
  }
}
```

## License

[MIT](https://github.com/nickuraltsev/react-overflow/blob/master/LICENSE)
