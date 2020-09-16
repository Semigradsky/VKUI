import React, { ElementType, HTMLAttributes, InputHTMLAttributes, useContext } from 'react';
import classNames from '../../lib/classNames';
import getClassName from '../../helpers/getClassName';
import Tappable from '../Tappable/Tappable';
import usePlatform from '../../hooks/usePlatform';
import { hasReactNode } from '../../lib/utils';
import Subhead from '../Typography/Subhead/Subhead';
import Title from '../Typography/Title/Title';
import { ANDROID, VKCOM } from '../../lib/platform';
import { HasLinkProps } from '../../types';
import Icon16Done from '@vkontakte/icons/dist/16/done';
import { ActionSheetContext } from '../ActionSheet/ActionSheetContext';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { SizeType } from '../../hoc/withAdaptivity';

export interface ActionSheetItemProps extends
  HTMLAttributes<HTMLElement>,
  HasLinkProps,
  Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'checked' | 'value'> {
  mode?: 'default' | 'destructive' | 'cancel';
  before?: React.ReactNode;
  meta?: React.ReactNode;
  subtitle?: React.ReactNode;
  autoclose?: boolean;
  selectable?: boolean;
  /**
   * @ignore
   */
  isLast?: boolean;
  disabled?: boolean;
}

const ActionSheetItem: React.FunctionComponent<ActionSheetItemProps> = ({
  className,
  children,
  autoclose,
  mode,
  meta,
  subtitle,
  before,
  isLast,
  selectable,
  value,
  name,
  checked,
  defaultChecked,
  onChange,
  onClick,
  ...restProps
}: ActionSheetItemProps) => {
  const platform = usePlatform();
  const { sizeY } = useAdaptivity();
  const { onItemClick, isDesktop } = useContext(ActionSheetContext);

  let Component: ElementType = 'div';

  if (restProps.href) {
    Component = 'a';
  } else if (selectable) {
    Component = 'label';
  }

  const isCompact = hasReactNode(subtitle) || hasReactNode(meta) || selectable;

  return (
    <Tappable
      {...restProps}
      onClick={onItemClick(onClick, autoclose)}
      className={
        classNames(
          getClassName('ActionSheetItem', platform),
          `ActionSheetItem--${mode}`,
          {
            'ActionSheetItem--compact': isCompact,
            'ActionSheetItem--desktop': isDesktop,
            [`ActionSheetItem--sizeY-${sizeY}`]: sizeY === SizeType.COMPACT,
          },
          className,
        )
      }
      Component={Component}
    >
      {hasReactNode(before) && <div className="ActionSheetItem__before">{before}</div>}
      <div className="ActionSheetItem__container">
        <div className="ActionSheetItem__content">
          <Title
            weight={mode === 'cancel' ? 'medium' : 'regular'}
            level={isCompact || hasReactNode(before) || (platform === ANDROID || platform === VKCOM) ? '3' : '2'}
            className="ActionSheetItem__children"
          >
            {children}
          </Title>
          {hasReactNode(meta) &&
            <Title
              weight="regular"
              level={isCompact || hasReactNode(before) || (platform === ANDROID || platform === VKCOM) ? '3' : '2'}
              className="ActionSheetItem__meta"
            >
              {meta}
            </Title>
          }
        </div>
        {hasReactNode(subtitle) && <Subhead weight="regular" className="ActionSheetItem__subtitle">{subtitle}</Subhead>}
      </div>
      {selectable &&
        <div className="ActionSheetItem__after">
          <input
            type="radio"
            className="ActionSheetItem__radio"
            name={name}
            value={value}
            onChange={onChange}
            defaultChecked={defaultChecked}
            checked={checked}
            disabled={restProps.disabled}
          />
          <div className="ActionSheetItem__marker"><Icon16Done /></div>
        </div>
      }
    </Tappable>
  );
};

ActionSheetItem.defaultProps = {
  mode: 'default',
};

export default ActionSheetItem;
