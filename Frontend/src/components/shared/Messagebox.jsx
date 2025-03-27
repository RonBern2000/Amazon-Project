import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types';

const Messagebox = ({children, variant}) => {
  return (
    <Alert variant={variant || "info"}>
      {children}
    </Alert>
  )
}

export default Messagebox;

Messagebox.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.string
}
