import { type IButtonProps, Button } from '@dedo_ai/gui-com-lib';

import './style.css';

export const SocialButton = (props: IButtonProps) => (
  <Button {...props} className={`${props.className} social`} />
);

export default SocialButton;
