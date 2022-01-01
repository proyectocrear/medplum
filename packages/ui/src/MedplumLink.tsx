import { Reference, Resource } from '@medplum/fhirtypes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { killEvent } from './utils/dom';

export interface MedplumLinkProps {
  to?: Resource | Reference | string;
  testid?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export function MedplumLink(props: MedplumLinkProps): JSX.Element {
  const navigate = useNavigate();

  let href = '#';
  if (props.to) {
    if (typeof props.to === 'string') {
      href = props.to;
    } else if ('resourceType' in props.to) {
      href = `/${props.to.resourceType}/${props.to.id}`;
    } else if ('reference' in props.to) {
      href = `/${props.to.reference}`;
    }
  }

  return (
    <a
      href={href}
      data-testid={props.testid || 'link'}
      onClick={(e: React.SyntheticEvent) => {
        killEvent(e);
        if (props.onClick) {
          props.onClick();
        } else if (props.to) {
          navigate(href);
        }
      }}
    >
      {props.children}
    </a>
  );
}
