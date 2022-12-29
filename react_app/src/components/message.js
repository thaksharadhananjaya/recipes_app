import Alert from 'react-bootstrap/Alert';

function Message(props) {
    
  return props.show?(
    <div>
      <Alert  variant={props.variant} onClose={props.onClose} dismissible>
          {props.message}
        </Alert>
    </div>
  ): <div></div>;
}

export default Message;