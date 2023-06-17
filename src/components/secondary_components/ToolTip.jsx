import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ToolTip({children, tooltip}) {
  return (
    <>
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              {tooltip}
            </Tooltip>
          }
        >
            {children}
        </OverlayTrigger>
    </>
  );
}

export default ToolTip;