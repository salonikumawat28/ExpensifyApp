import React, {Component} from 'react';
import {NavigationContext} from '@react-navigation/core';
import getComponentDisplayName from '../libs/getComponentDisplayName';
import refPropTypes from './refPropTypes';

export default function (WrappedComponent) {
    class WithNavigationFallback extends Component {
        render() {
            if (!this.context) {
                return (
                    <NavigationContext.Provider
                        value={{
                            isFocused: () => true,
                            addListener: () => () => {},
                            removeListener: () => () => {},
                        }}
                    >
                        <WrappedComponent
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...this.props}
                            ref={this.props.forwardedRef}
                        />
                    </NavigationContext.Provider>
                );
            }

            return (
                <WrappedComponent
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...this.props}
                    ref={this.props.forwardedRef}
                />
            );
        }
    }
    WithNavigationFallback.contextType = NavigationContext;
    WithNavigationFallback.displayName = `WithNavigationFocusWithFallback(${getComponentDisplayName(WrappedComponent)})`;
    WithNavigationFallback.propTypes = {
        forwardedRef: refPropTypes,
    };
    WithNavigationFallback.defaultProps = {
        forwardedRef: undefined,
    };
    return React.forwardRef((props, ref) => (
        <WithNavigationFallback
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            forwardedRef={ref}
        />
    ));
}
