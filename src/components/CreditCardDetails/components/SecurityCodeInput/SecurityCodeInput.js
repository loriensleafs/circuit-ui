/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { size } from 'polished';

import deprecate from '../../../../util/deprecate';
import Label from '../../../Label';
import MaskedInput from '../../../MaskedInput';
import InfoIcon from '../../../InfoIcon';
import IconButton from '../../../IconButton';
import { getPlaceholder, getMask } from './SecurityCodeInputService';

const infoButtonStyles = ({ theme }) => css`
  label: security-code-input__info-button;
  margin-left: ${theme.spacings.bit};
  align-self: center;
  ${size(theme.iconSizes.byte)};
`;

const InfoButton = styled(IconButton)(infoButtonStyles);

const SecurityCodeLabel = styled(Label)`
  display: flex;
`;

/**
 * A specialized input for credit card security codes (CVV, etc.).
 */
const SecurityCodeInput = ({
  label,
  iconLabel,
  id,
  cardScheme,
  onShowInfo,
  ...props
}) => {
  deprecate(
    [
      'SecurityCodeInput has been deprecated.',
      `Use SumUp's card widget instead:`,
      'https://developer.sumup.com/docs/widgets-card-v2.'
    ].join(' ')
  );
  return (
    <Fragment>
      <SecurityCodeLabel htmlFor={id}>
        {label}
        {onShowInfo && (
          <InfoButton onClick={onShowInfo} label={iconLabel}>
            <InfoIcon />
          </InfoButton>
        )}
      </SecurityCodeLabel>
      <MaskedInput
        autoComplete="cc-csc"
        pattern="\d{3,4}"
        mask={getMask(cardScheme)}
        placeholder={getPlaceholder(cardScheme)}
        {...{ ...props, id }}
      />
    </Fragment>
  );
};

SecurityCodeInput.propTypes = {
  /**
   * The label to be used (for i18n purposes).
   */
  label: PropTypes.string,
  /**
   * The label to be used for the info icon (for i18n purposes).
   */
  iconLabel: PropTypes.string,
  /**
   * Id to be used for the input.
   */
  id: PropTypes.string,
  /**
   * The card scheme the code is being entered for. Used
   * to determine whether to show a three or four digit
   * placeholder. The component defaults to a three-digit
   * placeholder.
   */
  cardScheme: PropTypes.string,
  onShowInfo: PropTypes.func
};

SecurityCodeInput.defaultProps = {
  label: 'Security code',
  iconLabel: 'Info',
  id: 'cui-cc-security-code',
  cardScheme: '',
  onShowInfo: null
};

export default SecurityCodeInput;
