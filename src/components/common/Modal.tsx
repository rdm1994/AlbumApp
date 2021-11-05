import React, {
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  ReactText,
  Ref,
  useState,
} from 'react';
import { Button } from 'components/common';
import { CloseIcon } from 'components/icons';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  ref?: Ref<HTMLDivElement>;
  open?: boolean;
  title?: ReactNode;
  width?: ReactText;
  height?: ReactText;
  children: ReactNode;
  onOkay?: () => void;
  onClose?: () => void;
}

export const Modal: FunctionComponent<ModalProps> = ({
  open,
  title,
  width,
  height,
  children,
  onOkay,
  onClose,
  ...rest
}) => {
  const [backdropElement, setBackdropElement] = useState<HTMLElement | null>(null);

  const classes = {
    root: 'z-[30] fixed left-0 top-0 w-screen h-screen flex justify-center items-center',
    backdrop: 'z-[-1] absolute left-0 top-0 w-full h-full bg-black/30',
    dialog:
      'relative shadow p-[16px] min-w-[240px] max-w-[80%] min-h-[120px] max-h-[80%] bg-white rounded flex flex-col items-stretch',
    titleBar: 'mb-[12px] flex justify-between items-center space-x-[8px] font-semibold text-[18px]',
    content: 'overflow-x-hidden overflow-y-auto',
    buttonBar: 'mt-[24px] flex justify-end space-x-[8px]',
  };

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === backdropElement && onClose) {
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className={classes.root} role="presentation">
      <div ref={setBackdropElement} className={classes.backdrop} onClick={handleBackdropClick} />

      <div className={classes.dialog} style={{ width, height }} {...rest}>
        {title && (
          <div className={classes.titleBar}>
            <span>{title}</span>
            <button className="p-[8px] pr-0" onClick={onClose}>
              <CloseIcon width={16} height={16} />
            </button>
          </div>
        )}

        <div className={classes.content}>{children}</div>

        <div className={classes.buttonBar}>
          <Button className="min-w-[64px]" onClick={onOkay ?? onClose}>
            Okay
          </Button>
          <Button className="min-w-[64px]" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
