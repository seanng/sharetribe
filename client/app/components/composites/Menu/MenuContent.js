import { Component, PropTypes } from 'react';
import r, { div } from 'r-dom';
import MenuItem from '../../elements/MenuItem/MenuItem';
import css from './Menu.css';

class MenuContent extends Component {

  constructor(props, context) {
    super(props, context);
    this.resolveElement = this.resolveElement.bind(this);
  }

  resolveElement(data, index) {
    if (data.type === 'menuitem') {
      return Object.assign({},
        { ContentComponent: MenuItem },
        { props: Object.assign({}, data, { index }),
        }
      );
    }
    return null;
  }

  render() {
    return (
      div(
        {
          tabIndex: '-1',
          style: { top: `${this.props.contentPosition}px` },
          className: `menu__content ${css.menuContent}`,
          ref: (c) => {
            this.menuContent = c;
          },
        }, [
          div({
            className: css.menuContentArrowBelow,
            style: { left: this.props.arrowPosition },
          }),
          div({
            className: css.menuContentArrowTop,
            style: { left: this.props.arrowPosition },
          }),
        ].concat(
          this.props.content.map((v, i) => {
            const elemData = this.resolveElement(v, i);
            return r(elemData.ContentComponent, elemData.props);
          })
        )
      )
    );
  }

}

const { arrayOf, bool, number, shape, string } = PropTypes;

MenuContent.propTypes = {
  content: arrayOf(
    shape({
      active: bool.isRequired,
      activeColor: string.isRequired,
      content: string.isRequired,
      href: string.isRequired,
      type: string.isRequired,
    })
  ).isRequired,
  contentPosition: number.isRequired,
  arrowPosition: number.isRequired,
};

export default MenuContent;
