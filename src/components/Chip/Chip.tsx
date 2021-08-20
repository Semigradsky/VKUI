import { FC, HTMLAttributes, ReactNode, useCallback, MouseEvent } from 'react';
import { Icon16Cancel } from '@vkontakte/icons';
import { getTitleFromChildren, hasReactNode, noop } from '../../lib/utils';
import { classNames } from '../../lib/classNames';
import Caption from '../Typography/Caption/Caption';
import Tappable from '../Tappable/Tappable';
import './Chip.css';

type ChipValue = string | number;

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  value: ChipValue;
  option?: { value?: ChipValue };
  onRemove?: (event?: MouseEvent, value?: ChipValue) => void;
  removable?: boolean;
  before?: ReactNode;
  after?: ReactNode;
}

const Chip: FC<ChipProps> = ({
  value = '',
  option,
  removable = true,
  onRemove = noop,
  before = null,
  after,
  children,
  ...restProps
}: ChipProps) => {
  const onRemoveWrapper = useCallback((event: MouseEvent) => {
    onRemove(event, value);
  }, [onRemove, value]);
  const title = getTitleFromChildren(children);

  return (
    <div vkuiClass={classNames('Chip', { 'Chip--removable': removable })} {...restProps}>
      <div vkuiClass="Chip__in">
        {hasReactNode(before) && <div vkuiClass="Chip__before">{before}</div>}
        <Caption level="1" weight="regular" vkuiClass="Chip__content" title={title}>{children}</Caption>
        {hasReactNode(after) && <div vkuiClass="Chip__after">{after}</div>}

        {removable &&
          <Tappable
            Component="button"
            vkuiClass="Chip__remove"
            onClick={onRemoveWrapper}
            hasHover={false}
            hasActive={false}
          >
            <Icon16Cancel />
          </Tappable>
        }
      </div>
    </div>
  );
};

export default Chip;
