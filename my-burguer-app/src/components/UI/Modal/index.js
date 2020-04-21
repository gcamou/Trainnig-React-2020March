import React from 'react';

import classes from './styles.css'
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/';

const Modal = props => {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== props.show || nextProps.children !== props.children;
    // }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Aux >
    )
}

export default React.memo(Modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show ||
        nextProps.children === prevProps.children
);